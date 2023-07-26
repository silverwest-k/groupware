import styles from "./ApprovalPathModal.module.css";
import {Button, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import fetcher from "../../fetcher";
import {MEMBER_LIST_INFO_API, TEAM_INFO_API, TEAM_MEMBER_INFO_API} from "../../constants/api_constans";
import useStore from "../../store";
import Accordion from "react-bootstrap/Accordion";

function ApprovalPathModal({showApprovalPathModal, handleApprovalPathModalClose}) {
    const {myAccount} = useStore(state => state)
    const [team, setTeam] = useState([]);
    const [selectTeam, setSelectTeam] = useState([]);
    const [member, setMember] = useState({});
    const [approvalMember, setApprovalMember] = ("");

    useEffect(() => {
        fetcher().get(TEAM_INFO_API)
            .then((res) => setTeam(res.data))
    }, [])

    useEffect(() => {
        if (selectTeam) {
            fetcher().get(`${TEAM_MEMBER_INFO_API}/${selectTeam}`)
                .then((res) => setMember(res.data))
        } else {
            setMember([])
        }
    }, [selectTeam])

    // const pickAccount = (account) => {
    //     selectAccount(account);
    //     handleApprovalPathModalClose();
    // }

    return (
        <div>
            <Modal show={showApprovalPathModal} onHide={handleApprovalPathModalClose}
                   className={`${styles.modal} ${styles.wrap}`} centered
            >
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title style={{fontWeight: "bold"}}>결재선 지정</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "0"}}>
                    <div className={styles.contents}>
                        {/* 조직도 */}
                        <div className={styles.leftSide}>
                            <div className={styles.title}>조직도</div>
                            <div className={styles.organizationChart}>
                                    <Accordion defaultActiveKey="0">
                                {team.map((teamData, idx) => {
                                    return(
                                        <Accordion.Item key={idx} eventKey={idx}>
                                            <Accordion.Header
                                                onClick={() => setSelectTeam(teamData)}
                                            >{teamData}
                                            </Accordion.Header>

                                            {member.map((memberData, memberIdx) => {
                                               return(
                                                   <Accordion.Body key={memberIdx}>
                                                       {memberData.name} {memberData.position}
                                                   </Accordion.Body>
                                               )
                                            })}
                                        </Accordion.Item>
                                    )
                                })}
                                    </Accordion>
                            </div>
                        </div>

                        {/* 버튼 */}
                        <div className={styles.midSide}>
                            <p>결재자</p>
                            <Button> > </Button>
                            <Button> = </Button>
                            <Button> = </Button>
                            <p>참조자</p>
                            <Button> > </Button>
                            <Button> = </Button>
                            <Button> = </Button>
                        </div>

                        {/* 결재라인 */}
                        <div>
                            <div className={styles.rightSide}>
                                <p className={styles.title}>결재선 정보</p>
                                <div className={styles.bookmark}>
                                    <p style={{marginBottom: "0"}}>사용자 결재라인</p>
                                    <select>
                                        <option value="">휴가신청서</option>
                                        <option value="">지출결의서</option>
                                        <option value="">지각사유서</option>
                                    </select>
                                    <Button className={styles.smallButton}>삭제</Button>
                                </div>

                                <div>
                                    <div className={styles.tableContainer}>
                                        <p className={styles.title}>결재자</p>
                                        <Table>
                                            <thead className={styles.tableHead}>
                                            <tr>
                                                <th>이름</th>
                                                <th>직급</th>
                                                <th>부서</th>
                                                <th>결재선</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{myAccount.name}</td>
                                                <td>{myAccount.position}</td>
                                                <td>{myAccount.team}</td>
                                                <td>작성</td>
                                            </tr>
                                            <tr>
                                                <td>김성철</td>
                                                <td>대리</td>
                                                <td>개발팀</td>
                                                <td>
                                                    <select>
                                                        <option value="">검토</option>
                                                        <option value="">승인</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>강동원</td>
                                                <td>차장</td>
                                                <td>개발팀</td>
                                                <td>
                                                    <select>
                                                        <option value="">검토</option>
                                                        <option value="">승인</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div>
                                    <div className={styles.tableContainer}>
                                        <p className={styles.title}>참조자</p>
                                        <Table>
                                            <thead className={styles.tableHead}>
                                            <tr>
                                                <th>이름</th>
                                                <th>직급</th>
                                                <th>부서</th>
                                                <th>결재선</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>이종석</td>
                                                <td>사원</td>
                                                <td>개발팀</td>
                                                <td>참조</td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td>{data.no}</td>*/}
                                            {/*    <td>{data.name}</td>*/}
                                            {/*    <td>{data.position}</td>*/}
                                            {/*    <td>{data.team}</td>*/}
                                            {/*</tr>*/}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                {/* 결재라인 추가 */}
                                <div className={styles.bookmark}>
                                    <p style={{marginBottom: "0"}}>사용자 결재라인 이름</p>
                                    <input/>
                                    <Button className={styles.smallButton}>저장</Button>
                                </div>

                                {/*<div className={styles.search}>*/}
                                {/*    <InputGroup className="mb-3">*/}
                                {/*        <FormControl type="text" className="form-control-lg" placeholder="이름"/>*/}
                                {/*        <Button className={styles.searchButton}> 검색 </Button>*/}
                                {/*    </InputGroup>*/}
                                {/*</div>*/}
                            </div>

                            {/* 버튼 */}
                            <div style={{float: "right"}}>
                                <Button>적용</Button>

                                <Button variant="secondary" onClick={handleApprovalPathModalClose}>닫기</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ApprovalPathModal