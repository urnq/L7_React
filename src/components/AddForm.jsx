import '../AddForm.css';
import '../App.css';
import {RxCross1} from "react-icons/rx";
import StateList from "./StateList.jsx";
import {useState} from "react";

function AddFrom({addItemHandler, modalActionHandler}) {
    const [item, setItem] = useState({id: -1, state: 0, time: new Date(Date.now()).toLocaleString()});

    const updateTaskState = (id, newState) => {
        setItem(prevItem => ({...prevItem, state: newState}));
    };
    const updateTitle = (newState) => {
        setItem(prevItem => ({...prevItem, title: newState}));
    }
    const updateTime = (newState) => {
        setItem(prevItem => ({...prevItem, time: newState.toLocaleString()}));
    }
    
    const fullCloseModalHandler = () => {
        setItem({id: -1, state: 0, time: new Date(Date.now()).toLocaleString()})
        modalActionHandler(false)
    }
    
    return (<div className={'add-form'}>
        <RxCross1 className={'cross'} onClick={() => fullCloseModalHandler(false)}/>
        <div className={'add-form-title'}>Добавить новую задачу</div>
        <table className={'add-form-table'}>
            <tr>
                <td style={{width: '30%'}}>
                    Описание
                </td>
                <td>
                    <input onChange={ (event)=> {updateTitle(event.target.value)}} placeholder={'Введите описание'} type={'text'}/>
                </td>
            </tr>
            <tr>
                <td>Статус</td>
                <td style={{marginLeft: '-10px', position: 'absolute', marginTop: '5px'}}>
                    <StateList item={item} onStateChange={updateTaskState}/>
                </td>
            </tr>
            <tr>
                <td>Дедлайн</td>
                <td>
                    <input onChange={ (event)=> {updateTime(event.target.value)}} type={'date'}/>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <button onClick={()=>{ addItemHandler(item); fullCloseModalHandler(false) } } className={'add-button'} style={{marginTop: '40px'}}>Добавить задачу</button>
                </td>
            </tr>
        </table>
    </div>);
}

export default AddFrom;
