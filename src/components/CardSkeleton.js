import Skeleton from "react-loading-skeleton";

const CardSkeleton = ({ cards }) => {
    console.log(cards);
    return Array.from({ length: cards }, (_, i) => (
        <div className="card-skeleton" key={i}>
            <div className="left-col">
                <Skeleton circle width={40} height={40} />
            </div>
            <div className="right-col">
                <Skeleton width={100} />
                <Skeleton />
            </div>
        </div>
    ));
};
export default CardSkeleton;