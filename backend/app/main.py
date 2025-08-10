from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from .models import Todo

app = FastAPI(title="Minimal API")

# dev only: auto create tables
Base.metadata.create_all(bind=engine)

class TodoCreate(BaseModel):
    title: str

class TodoRead(BaseModel):
    id: int
    title: str
    done: bool
    class Config:
        from_attributes = True

@app.get("/healthz")
def healthz():
    return {"ok": True}

@app.get("/todos", response_model=List[TodoRead])
def list_todos(db: Session = Depends(get_db)):
    return db.query(Todo).order_by(Todo.id).all()

@app.post("/todos", response_model=TodoRead, status_code=201)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    todo = Todo(title=payload.title, done=False)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@app.post("/todos/{todo_id}/toggle", response_model=TodoRead)
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.done = not todo.done
    db.commit()
    db.refresh(todo)
    return todo

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return
