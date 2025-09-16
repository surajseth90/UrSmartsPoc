import './style.scss';
import { LeftArrowIcon } from "../Icons/index";


export default function Pagination(props) {
    const { currentPage, setCurrentPage, totalPages } = props;
    return (
        <div
            className={`pagination py-2 pb-4 w-100 d-flex justify-content-between ${totalPages == 0 ? "d-none" : ""
                }`}
        >
            <p>
                Page <input
                    value={currentPage}
                    onChange={(e) => {
                        let val = e.target.value
                        setCurrentPage(val)
                    }}
                    className="page-input"
                    max={totalPages}
                    type="number"


                />  of {totalPages}
            </p>
            <div className="d-flex gap-4">
                <button
                    className="d-flex align-items-center"
                    title="back"
                    disabled={currentPage == 1}
                    onClick={() => {
                        if (currentPage != 1) setCurrentPage(currentPage - 1);
                    }}
                >
                    <LeftArrowIcon />
                </button>
                <button
                    title="next"
                    disabled={currentPage == totalPages}
                    className="right-arrow d-flex align-items-center"
                    onClick={() => {
                        if (currentPage != totalPages) setCurrentPage(currentPage + 1);
                    }}
                >
                    <LeftArrowIcon />
                </button>
            </div>
        </div>
    )
}
