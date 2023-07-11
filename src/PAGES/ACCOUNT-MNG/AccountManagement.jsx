import {Button, Modal, ToggleButton} from "react-bootstrap";
import styles from "./AccountManagement.module.css"
import {useState} from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DeleteModal from "./DeleteModal";
import PartModal from "./PartModal";
import useStore from "../../store";
import PositionModal from "./PositionModal";
import AccountModal from "./AccountModal";

function AccountManagement() {
    const [radioValue, setRadioValue] = useState('1');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPartModal, setShowPartModal] = useState(false);
    const [showPositionModal, setShowPositionModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);

    const {account, teamName, positionName} = useStore(state => state);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [no, setNo] = useState("");
    const [team, setTeam] = useState("");
    const [position, setPosition] = useState("");

    const radioState = [
        { name: '사용중', value: '1' },
        { name: '접속차단', value: '2' }
    ];

    const resetInput = () =>{
        setName("")
        setPassword("")
        setNo("")
        setTeam("")
        setPosition("")
    }

    const handleDeleteModalOpen = () => setShowDeleteModal(true);
    const handleDeleteModalClose = () => setShowDeleteModal(false);
    const handlePartModalOpen = () => setShowPartModal(true);
    const handlePartModalClose = () => setShowPartModal(false);
    const handlePositionModalOpen = () => setShowPositionModal(true);
    const handlePositionModalClose = () => setShowPositionModal(false);
    const handleAccountModalOpen = () => setShowAccountModal(true);
    const handleAccountModalClose = () => setShowAccountModal(false);


    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.upperButton}>
                    <div>
                        계정관리
                        <Button variant="primary"
                                className={styles.button} style={{marginLeft:"15px"}}
                                onClick={handleAccountModalOpen}
                        >불러오기</Button>
                    </div>
                    <Button variant="primary"
                            className={styles.button}
                            onClick={handleDeleteModalOpen}
                    >삭제</Button>
                </div>

                <div className={styles.contents}>
                    <div className={styles.profile}>
                        <img src={require("../../IMAGES/profile.jpeg")} />
                        <Button variant="primary" className={styles.button}>사진등록</Button>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.line}>
                            이　　름 <input value={account.name}
                                        onChange={(e)=>setName(e.target.value)}
                        />
                        </div>

                        <div className={styles.line}>
                            비밀번호 <input value={account.password}
                                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        </div>

                        <div className={styles.line}>
                            사　　번 <input value={account.no}
                                        onChange={(e)=>setNo(e.target.value)}
                        />
                        </div>

                        <div className={styles.line}>
                            부　　서 <input value={teamName || account.team}
                                        onChange={(e)=>setTeam(e.target.value)}
                        />
                            <img src={require("../../IMAGES/more.png")}
                                 className={styles.icon}
                                 onClick={handlePartModalOpen}
                            />
                        </div>

                        <div className={styles.line}>
                            직　　급 <input value={positionName || account.position}
                                        onChange={(e)=>setPosition(e.target.value)}
                        />
                            <img src={require("../../IMAGES/more.png")}
                                 className={styles.icon}
                                 onClick={handlePositionModalOpen}
                            />
                        </div>

                        <div className={styles.line} style={{alignItems:"baseline"}}>
                            계정상태
                            <ButtonGroup style={{marginLeft:"15px"}}>
                                {radioState.map((radio, idx) => (
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

            <DeleteModal
                resetInput={resetInput}
                showDeleteModal={showDeleteModal}
                handleDeleteModalClose={handleDeleteModalClose}
            />
            <AccountModal showAccountModal={showAccountModal} handleAccountModalClose={handleAccountModalClose} />
            <PartModal showPartModal={showPartModal} handlePartModalClose={handlePartModalClose} />
            <PositionModal showPositionModal={showPositionModal} handlePositionModalClose={handlePositionModalClose} />
        </div>
    )
}

export default AccountManagement