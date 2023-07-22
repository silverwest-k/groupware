import styles from "./ReceiveDocument.module.css"
import Pagination from "react-bootstrap/Pagination";
import {useEffect, useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import fetcher from "../../fetcher";

function ReceiveDocument() {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;
    const total = data.length;
    const pageNum = Math.ceil(total / limit);

    useEffect(() => {
        fetcher().get("/receiveDocument")
            .then((res) => setData(res.data))
    },[])

    const getBackgroundColor = (state) => {
        return state === "진행중" ? "#f6c76a" : state === "완료" ? "#87ea85" : state === "반려" ? "#fb6a76" : "white";
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <InputGroup>
                    <FormControl type="text" className="form-control-lg" placeholder="제목"/>
                    <Button className={styles.searchButton}> 검색 </Button>
                </InputGroup>
            </div>
            <div className={styles.cardContainer}>
                {data.slice(offset, offset + limit).map((data, index) => {
                    return (
                        <div className={styles.card}>
                            <div className={styles.contents}>
                                <div className={styles.upperState}
                                     style={{background: getBackgroundColor(data.state)}}
                                >
                                    {data.state}
                                </div>

                                <div className={styles.documentInfo}>
                                    <div className={styles.cardUpper}>
                                        <div className={styles.cardTitle}>{data.title}</div>
                                    </div>
                                    <div className={styles.cardLower}>
                                        <div>기안자 : {data.name}</div>
                                        <div>날짜 : {data.date}</div>
                                        <div>양식 : {data.form}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.divisionLine}/>

                            <div className={styles.approvalButton}
                                 style={{
                                     cursor: data.state === "완료" ? "not-allowed" : "pointer",
                                     color: data.state === "완료" ? "gray" : ""
                                 }}
                            >
                                결재하기
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.pagination}>
                <Pagination>
                    <Pagination.First onClick={() => setPage(1)} disabled={page === 1}/>
                    <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}/>
                    {Array(pageNum)
                        .fill()
                        .map((_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 && "page"}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))
                    }
                    <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === pageNum}/>
                    <Pagination.Last onClick={() => setPage(pageNum)} disabled={page === pageNum}/>
                </Pagination>
            </div>
        </div>
    )
}

export default ReceiveDocument