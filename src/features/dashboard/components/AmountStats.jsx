
import { formatPrice } from "../../../components/Input/Format"
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import BuildingOffice2Icon from '@heroicons/react/24/outline/BuildingOffice2Icon'

function AmountStats({ roomTotal, roomPriceTotal }) {
    return (
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <BuildingOffice2Icon className='w-8 h-8' />
                </div>
                <div className="stat-title">Tổng số phòng</div>
                <div className="stat-value" style={{ fontSize: '25px' }}>{`${formatPrice(roomTotal)} `}</div>
            </div>

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <CurrencyDollarIcon className='w-8 h-8' />
                </div>
                <div className="stat-title">Tổng số tiền tất cả các phòng</div>
                <div className="stat-value" style={{ fontSize: '25px' }}>{`${formatPrice(roomPriceTotal)} VND`}</div>
            </div>

            {/* <div className="stat">
                <div className="stat-title">Số tiền cọc</div>
                <div className="stat-value">$5,600</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Members</button> 
                </div>
            </div> */}
        </div>
    )
}

export default AmountStats