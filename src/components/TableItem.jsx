import '../App.css'
import StateList from "./StateList.jsx";
import {FaRegTrashAlt} from "react-icons/fa";

function TableItem({item, onStateChange, deleteTaskHandler}) {

    const checkDate = (date) => {
        const dateNow = new Date();

        const check = new Date(date);
        const now = new Date(dateNow);

        check.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        if (check.getTime() < now.getTime()) {
            return true;
        } else if (check.getTime() === now.getTime()) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>
                <StateList item={item} onStateChange={onStateChange}/>
            </td>
            <td className={(checkDate(item.time) ? 'date-lose' : '')}>{new Date(item.time).toLocaleDateString()}</td>
            <td className='tde'>
                <div className='trash-container' onClick={()=>deleteTaskHandler(item.id)}>
                    <FaRegTrashAlt className='trash'/>
                </div>
            </td>
        </tr>
    )
}

export default TableItem;
