import {Button, Modal, ToggleButton} from "react-bootstrap";
import styles from "./AccountManagement.module.css"
import {useState} from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function AccountManagement() {
    const [radioValue, setRadioValue] = useState('1');
    const [show, setShow] = useState(false);

    const radios = [
        { name: '사용중', value: '1' },
        { name: '접속차단', value: '2' }
    ];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.upperButton}>
                    <div>
                        계정관리
                        <Button variant="primary" className={styles.button} style={{marginLeft:"15px"}}>불러오기</Button>
                    </div>
                    <Button variant="primary"
                            className={styles.button}
                            onClick={handleShow}
                    >삭제</Button>
                </div>

                <div className={styles.contents}>
                    <div className={styles.profile}>
                        <img src={require("../../IMAGES/profile.jpeg")} />
                        <Button variant="primary" className={styles.button}>사진등록</Button>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.line}>
                            이름 <input/>
                        </div>

                        <div className={styles.line}>
                            비밀번호 <input type="password" />
                            <Button variant="primary" className={styles.button}>초기화</Button>
                        </div>

                        <div className={styles.line}>
                            사번 <input/>
                        </div>

                        <div className={styles.line}>
                            부서 <input/>
                            <img src={require("../../IMAGES/more.png")} className={styles.icon} />
                        </div>

                        <div className={styles.line}>
                            직급 <input/>
                            <img src={require("../../IMAGES/more.png")} className={styles.icon} />
                        </div>

                        <div className={styles.line} style={{alignItems:"baseline"}}>
                            계정상태
                            <ButtonGroup style={{marginLeft:"15px"}}>
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.modify}>
                        <Button variant="primary" className={styles.button}>수정</Button>
                    </div>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className={styles.modal}
            >
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title style={{fontWeight:"bold"}}>계정삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    계정을 완전히 삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary"
                            className={styles.button}
                    >확인</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AccountManagement