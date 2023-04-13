import React, { useRef, useState } from "react";
import styles from "./css/todoList.module.css";

const dummyData: any[] = [];

// { date: "2023-04-11", type: "work", content: "첫 번째 할일입니다." },
// { date: "2023-04-11", type: "hobby", content: "두 번째 할일입니다." },
// { date: "2023-04-11", type: "friend", content: "세 번쨰 할일입니다." },
interface Content {
  date: string;
  content: string;
}

const TodoList = () => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const dateRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const createList = () => {
    const dateString = dateRef.current?.value;
    const contentString = contentRef.current!.value;
    console.log(dateString, contentString);
    if (!dateString) {
      alert("날짜를 선택하세요");
      return;
    } else if (!contentString) {
      alert("내용을 입력하세요");
      return;
    }

    setContentList((prev) => [
      ...prev,
      { date: dateString, content: contentString },
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.generator}>
        <input type="date" className={styles.select_date} ref={dateRef} />
        <textarea
          name="text_content"
          id="textContent"
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
      </div>
      <table>
        <colgroup>
          <col span={1} />
          <col span={2} />
          <col span={8} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">순서</th>
            <th scope="col">날짜</th>
            <th scope="col">내용</th>
          </tr>
        </thead>
        <tbody>
          {contentList.length !== 0 ? (
            contentList.map((listData, i) => (
              <tr key={`${i}+${listData.content}`}>
                <th>{i + 1}</th>
                <td>{listData.date}</td>
                <td>{listData.content}</td>
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
