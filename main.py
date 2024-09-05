from fastapi import FastAPI,UploadFile,Response,Form,Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.encoders import jsonable_encoder
from typing import Annotated
from datetime import timedelta
import sqlite3

con = sqlite3.connect('SNS.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()

SECRET = "secret"
manager = LoginManager(SECRET,"/login")

# 로그인하기
@manager.user_loader()
def query_user(data):
    WHERE_STATEMENTS = f'''user_id = "{data}"'''
    if type(data) == dict:
        WHERE_STATEMENTS = f'''user_id="{data['id']}"''' 
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    user = cur.execute(f"""
                        SELECT * FROM users WHERE {WHERE_STATEMENTS}
                        """).fetchone()
    return user  
    
@app.post("/login")
def login(
          id:Annotated[str,Form()],
          password:Annotated[str,Form()]
          ):
    user = query_user(id)
    
    if not user:
        raise InvalidCredentialsException
    elif password != user["password"]:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data={
        'sub': {
            'id':user['id'],
            'nickname':user['nickname'],
            'email':user['email']
        }
    })
    
    return {'access_token': access_token}
   
#중복 아이디 확인
@app.get("/id/{user_id}")
async def get_id(user_id):
    cur = con.cursor()
    cur.execute(f"""
                SELECT user_id from users WHERE user_id = '{user_id}'
                """)
    res = cur.fetchone()
    
    if res:
        return True
    else: return False

# 회원가입하기
@app.post("/signup")
async def signup_items(
                profile_img:UploadFile,
                user_id:Annotated[str,Form()],
                password:Annotated[str,Form()],
                name:Annotated[str,Form()],
                nickname:Annotated[str,Form()],
                email:Annotated[str,Form()],
                 ):
    image_bytes  = await profile_img.read()
    cur = con.cursor()
    cur.execute(f"""
                INSERT INTO users(user_id,password,name,nickname,profile_img,email)
                VALUES ('{user_id}','{password}','{name}','{nickname}','{image_bytes.hex()}','{email}')
                """)
    con.commit()
    return '200' 

# 게시글 쓰기
@app.post("/items")
async def write_item(
                    image:UploadFile,
                    title:Annotated[str,Form()],
                    detail:Annotated[str,Form()],
                    public:Annotated[str,Form()],
                    user_id:Annotated[int,Form()],
                    atime:Annotated[int,Form()],
                    like_cnt:Annotated[int,Form()],
                    comment_cnt:Annotated[int,Form()],
                    tag_id:Annotated[int,Form()]
                    ):
    image_bytes  =await image.read()
    cur.execute(f"""
                INSERT INTO items (title,image,detail,public,user_id,atime,like_cnt,comment_cnt,tag_id)
                VALUES ('{title}','{image_bytes.hex()}','{detail}','{public}','{user_id}','{atime}','{like_cnt}','{comment_cnt}','{tag_id}')
                """)
    con.commit()
    return '200'

# 메인 페이지 게시글 가져오기
@app.get("/items")
async def get_items():
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * from items
                       """).fetchall()
     
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

# 메인 페이지 게시글 이미지 가져오기
@app.get("/images/{item_id}")
async def get_image(item_id:int):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT image FROM items WHERE id = {item_id}
                              """).fetchone()[0]
    
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')

# 각 게시글 데이터 가져오기
@app.get("/items/{item_id}")
async def get_item(item_id:int):
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * from items WHERE id = {item_id}
                       """).fetchone()
    return rows
     
# 게시글 좋아요 수 증가
@app.get("/likeI/{item_id}")
async def change_likeI(item_id:int):
    cur = con.cursor()
    cur.execute(f"""
                UPDATE items SET like_cnt = like_cnt + 1 WHERE id = {item_id}
                """)
    con.commit()
    return '200'

# 게시글 좋아요 수 감소
@app.get("/likeD/{item_id}")
async def change_likeD(item_id:int):
    cur = con.cursor()
    cur.execute(f"""
                UPDATE items SET like_cnt = like_cnt - 1 WHERE id = {item_id}
                """)
    con.commit()
    return '200'

# 유저 정보 가져오기
@app.get("/users/{user_id}")
async def get_user(user_id):  
    cur = con.cursor()
    rows = cur.execute(f"""
                SELECT * from users WHERE id = {user_id}
                """).fetchone()
    return rows

# 유저 이미지 가져오기
@app.get("/user_img/{user_id}")
async def user_image(user_id:int):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT profile_img FROM users WHERE id = {user_id}
                              """).fetchone()[0]
    
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')
    
# 게시글 삭제하기
@app.delete("/items/{item_id}")
def del_item(item_id):
    cur = con.cursor()
    cur.execute(f"""
                DELETE FROM items WHERE id = {item_id}
                """)
    con.commit()
    return '200'
  
app.mount("/", StaticFiles(directory="frontend",html=True), name="static")