import styles from "./Write.module.css"
import Dropdown from 'react-bootstrap/Dropdown';
import {Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import fetcher from "../../fetcher";
import {CATEGORY_LIST_API, DOCUMENT_CREATE_API, SHOW_CATEGORY_API} from "../../constants/api_constans";
import ApprovalPathModal from "./ApprovalPathModal";
import useStore from "../../store";
/* 문서양식 띄우기 */
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import {useNavigate} from "react-router-dom";
import {REPORT_DOCUMENT_COMPONENT, TEMP_DOCUMENT_COMPONENT} from "../../constants/component_constants";
import SignTable from "./SignTable";

function Write() {
    const { signLine} = useStore(state => state)
    const editorRef = useRef();
    const navigate = useNavigate();
    const approvers = [signLine.signTurn1.id, signLine.signTurn2.id, signLine.signRefer.id];

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState("1")
    const [category, setCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [htmlData, setHtmlData] = useState("")
    const [showApprovalPathModal, setShowApprovalPathModal] = useState(false);

    useEffect(() => {
        fetcher().get(CATEGORY_LIST_API)
            .then((res) => setCategoryList(res.data))
    }, [])

    const onChange = () => {
        const data = editorRef.current?.getInstance().getHTML();
        setContent(data)
    };
    const resetInput = () => {
        setTitle("")
        setContent("")
        setStatus("")
    }
    const saveBtn = (status) => {
        fetcher().post(DOCUMENT_CREATE_API, {
            "title": title,
            "content": content,
            "approvers":approvers,
            "status": status,
        })
            .then(resetInput)
    }
    const selectCategory = (id) => {
        fetcher().get(`${SHOW_CATEGORY_API}/${id}`)
            .then((res) => {
                setCategory(res.data)
                setHtmlData(res.data.content)
                editorRef.current?.getInstance().setHTML(htmlData);
            })
    }
    /** 저장, 임시저장 구분*/
    const handleTempSave = () => {
        saveBtn(0)
        alert("저장되었습니다.")
        navigate(`/page/${TEMP_DOCUMENT_COMPONENT}`)
    }
    const handleSave = () => {
        saveBtn(1)
        alert("상신되었습니다.")
        navigate(`/page/${REPORT_DOCUMENT_COMPONENT}`)
    }
    // const time = new Date();
    // const toDay = {
    //     year: time.getFullYear(),
    //     month: (time.getMonth() + 1).toString().padStart(2, "0"),
    //     day: time.getDate().toString().padStart(2, "0")
    // }
    // const sign_Table_Left_data = [
    //     {title: "기안자", content: `${myAccount.name}`},
    //     {title: "기안부서", content: `${myAccount.team}`},
    //     {title: "기안일", content: `${toDay.year}-${toDay.month}-${toDay.day}`},
    //     {title: "문서번호", content: ""}
    // ]
    // const sign_Table_Right_data = [
    //     {signTurn: "작 성", sign: "", signName: `${myAccount.name}${myAccount.position}`},
    //     {signTurn: "검 토", sign: "", signName: signLine.signTurn1 ? `${signLine.signTurn1.name} ${signLine.signTurn1.position}` : ""},
    //     {signTurn: "승 인", sign: "", signName: signLine.signTurn2 ? `${signLine.signTurn2.name} ${signLine.signTurn2.position}` : ""}
    // ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperContainer}>
                <div className={styles.select}>
                    <Dropdown>
                        <Dropdown.Toggle className="button">
                            {category ? category.category : "문서양식"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropMenu}>
                            {categoryList.map((data) => {
                                return (
                                    <Dropdown.Item key={data.id} onClick={() => selectCategory(data.id)}>
                                        {data.category}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className="button" onClick={() => setShowApprovalPathModal(true)}>결재라인</Button>
                </div>

                <div className={styles.buttonGroup}>
                    <Button className="button" onClick={()=>navigate(-1)}>작성취소</Button>
                    <Button className="button" onClick={handleTempSave}>임시저장</Button>
                    <Button className="button" onClick={handleSave}>상신하기</Button>
                </div>
            </div>

            <div className={styles.divisionLine}></div>
            <div className={styles.lowerContainer}>
                <div className={styles.categoryTitle}>
                    <p>{category ? category.category : "양식을 선택하세요"}</p>
                </div>
                {/*<div className={styles.signTable}>*/}
                {/*    <div>*/}
                {/*        <table>*/}
                {/*            <tbody>*/}
                {/*            {sign_Table_Left_data.map((data) => {*/}
                {/*                return (*/}
                {/*                    <tr>*/}
                {/*                        <td className={styles.signTableLeft_title}>{data.title}</td>*/}
                {/*                        <td className={styles.signTableLeft_content}>{data.content}</td>*/}
                {/*                    </tr>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*            </tbody>*/}
                {/*        </table>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <table>*/}
                {/*            <tbody>*/}
                {/*            <tr>*/}
                {/*                <th className={styles.signTableRight_title}>결재</th>*/}
                {/*                {sign_Table_Right_data.map((data, index) => {*/}
                {/*                    return (*/}
                {/*                        <td key={index} className={styles.signTableRight_content}>*/}
                {/*                            <div className={styles.signInfo}>{data.signTurn}</div>*/}
                {/*                            <div className={styles.sign}>{data.sign}</div>*/}
                {/*                            <div className={styles.signInfo}>{data.signName}</div>*/}
                {/*                        </td>*/}
                {/*                    )*/}
                {/*                })}*/}
                {/*            </tr>*/}
                {/*            </tbody>*/}
                {/*        </table>*/}

                {/*        <div className={styles.referTable}>*/}
                {/*            <div className={styles.referTitle}>참조</div>*/}
                {/*            <div className={styles.referContent}>{`${signLine.signRefer.name} ${signLine.signRefer.position}`}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <SignTable/>

                <div className={styles.editorContainer}>
                    <div className={styles.documentTitle}>
                        <p>제목 :</p>
                        <input value={title}
                           placeholder={"제목을 입력하세요"}
                           style={{margin: "10px 0"}}
                           onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                    <Editor
                        ref={editorRef}
                        previewStyle="vertical"
                        height="700px"
                        initialEditType="wysiwyg"
                        language="ko-KR"
                        plugins={[colorSyntax]}
                        hideModeSwitch={true}
                        useCommandShortcut={false}
                        onChange={onChange}
                        toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock']
                        ]}
                    ></Editor>
                </div>
            </div>

            <ApprovalPathModal showApprovalPathModal={showApprovalPathModal}
                               handleApprovalPathModalClose={() => setShowApprovalPathModal(false)}
            />
        </div>
    )
}

export default Write