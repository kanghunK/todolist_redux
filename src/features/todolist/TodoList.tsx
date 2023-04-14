import { useRef, useState, useEffect } from "react";
import styles from "./css/todoList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Content,
  addListAsync,
  deleteListAsync,
  todoListState,
} from "./todoListSlice";
import { AppDispatch } from "../../app/store";
import { Spinner } from "react-bootstrap";

const TodoList = () => {
  const { workState, workType, dataList, listNumber } = useSelector(
    (state: todoListState) => state
  );
  const dispatch = useDispatch<AppDispatch>();

  const dateRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const createList = async () => {
    const dateString = dateRef.current?.value;
    const contentString = contentRef.current!.value;

    if (!dateString) {
      alert("날짜를 선택하세요");
      return;
    } else if (!contentString) {
      alert("내용을 입력하세요");
      return;
    }

    if (listNumber >= 10) {
      alert("10개를 초과해서서 생성할 수 없습니다.");
      return;
    }

    await dispatch(addListAsync({ date: dateString, content: contentString }));
  };

  const deleteContent =
    (order: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      await dispatch(deleteListAsync(order));
    };

  return (
    <div className={styles.container}>
      <div className={styles.generator}>
        <input type="date" className={styles.select_date} ref={dateRef} />
        <textarea
          name="text_content"
          className={styles.text_content}
          cols={30}
          rows={10}
          ref={contentRef}
        ></textarea>
        <button
          type="button"
          className={styles.create_btn}
          onClick={createList}
        >
          생성하기
        </button>
        {workType === "add" && workState === "loading" && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
      <table>
        <colgroup>
          <col span={1} />
          <col span={2} />
          <col span={8} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              {workType === "add" && workState === "loading" && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              순서
            </th>
            <th scope="col">날짜</th>
            <th scope="col">내용</th>
          </tr>
        </thead>
        <tbody>
          {dataList.length !== 0 ? (
            dataList.map((listData, i) => (
              <tr key={`${i}+${listData.content}`}>
                <th>{i + 1}</th>
                <td>{listData.date}</td>
                <td>
                  {listData.content}
                  <button type="button" onClick={deleteContent(listData.order)}>
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>목록이 비었습니다..</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
