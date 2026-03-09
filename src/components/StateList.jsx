import '../App.css';

function StateList({ item, onStateChange }) {
    const handleChange = (event) => {
        const value = Number(event.target.value);
        onStateChange(item.id, value);
    };

    let className = '';
    switch (item.state) {
        case 0:
            className = 'select-no-complete';
            break;
        case 1:
            className = 'select-complete';
            break;
        case 2:
            className = 'remove';
            break;
        default:
            className = '';
    }

    return (
        <div className="state-list">
            <select
                id="switch-select"
                value={item.state}
                onChange={handleChange}
                className={className}
            >
                <option value={0} className="select-no-complete">
                    Активная задача
                </option>
                <option value={1} className="select-complete">
                    Задача выполнена
                </option>
                <option value={2} className="remove">
                    Задача отменена
                </option>
            </select>
        </div>
    );
}

export default StateList;
