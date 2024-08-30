from fastapi import FastAPI,UploadFile,Response,Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Annotated
import sqlite3

con = sqlite3.connect('SNS.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()

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
     
# 각 게시글 좋아요 수 변경하기
@app.get("/like/{item_id}")
async def change_like(item_id:int):
    cur = con.cursor()
    cur.execute(f"""
                UPDATE items SET like_cnt = like_cnt + 1 WHERE id = {item_id}
                """)
    con.commit()
    return '200'

    
app.mount("/", StaticFiles(directory="frontend",html=True), name="static")