import { useRef, useState } from "react";
import styles from "./css/todoList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  addListAsync,
  deleteList,
  deleteListAsync,
  todoListState,
} from "./todoListSlice";
import { AppDispatch } from "../../app/store";
import { Button, Spinner } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const TodoList = () => {
  const { workDate, workState, workType, dataList, listNumber } = useSelector(
    (state: todoListState) => state
  );
  const dispatch = useDispatch<AppDispatch>();
  const isBigScreen = useMediaQuery({ query: "(min-width: 820px)" });

  const [title, setTitle] = useState("생성하기");
  const dateRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const createList = async () => {
    const dateString = dateRef.current?.value;
    const contentString = contentRef.current?.value;

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

    await dispatch(addList());
    await dispatch(addListAsync({ date: dateString, content: contentString }));
    dateRef.current.value = "";
    contentRef.current.value = "";
  };

  const deleteContent =
    (order?: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(order);
      if (order === undefined) return;
      await dispatch(deleteList({ order }));
      await dispatch(deleteListAsync(order));
    };

  // 수정하기를 했을 때 수정하는 모달 화면이 떠야 한다. title을 변경할 예정
  const editContent =
    (order?: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      setTitle("수정하기");
    };

  return (
    <div className={styles.container}>
      <h1>TodoList</h1>
      <div className={styles.generator}>
        <div className={styles.generator_header}>
          <h2>리스트 생성하기</h2>
          {workType === "add" && workState === "loading" && (
            <Spinner
              animation="border"
              className={styles.generator_loading}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
        <div className={styles.generator_content}>
          <div>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              className={styles.select_date}
              ref={dateRef}
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              name="text_content"
              id="content"
              className={styles.text_content}
              cols={30}
              rows={10}
              ref={contentRef}
            ></textarea>
          </div>
          <div className={styles.btn_wrapper}>
            <Button
              type="button"
              variant="dark"
              className={styles.create_btn}
              onClick={createList}
            >
              생성하기
            </Button>
          </div>
        </div>
      </div>
      <table className={styles["rwd-table"]}>
        <colgroup>
          {isBigScreen ? (
            <>
              <col width={"10%"} />
              <col width={"30%"} />
              <col width={"40%"} />
              <col width={"20%"} />
            </>
          ) : (
            <>
              <col width={"60%"} />
              <col width={"40%"} />
            </>
          )}
        </colgroup>
        {isBigScreen && (
          <thead>
            <tr>
              <th scope="col">순서</th>
              <th scope="col">날짜</th>
              <th scope="col">내용</th>
              <th scope="col">관리</th>
            </tr>
          </thead>
        )}
        <tbody>
          {dataList.length !== 0 ? (
            <>
              {dataList.map((listData, i) => (
                <tr key={`${listData.order}`}>
                  <td data-th="순서" className={styles.v_td}>
                    {i + 1}
                  </td>
                  <td data-th="날짜" className={styles.v_td}>
                    {listData.date}
                  </td>
                  <td
                    data-th="내용"
                    className={`${styles.v_td} ${styles.last}`}
                  >
                    {listData.content}
                  </td>
                  <td className={styles.manage_btn}>
                    {workDate?.order === listData.order &&
                      workType === "delete" &&
                      workState === "loading" && (
                        <Spinner
                          animation="border"
                          className={styles.generator_loading}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      )}
                    <Button
                      type="button"
                      variant="primary"
                      onClick={editContent(listData.order)}
                    >
                      수정
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={deleteContent(listData.order)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </>
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
