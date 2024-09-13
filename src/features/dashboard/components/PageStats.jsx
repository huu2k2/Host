import CurrencyDollarIcon  from '@heroicons/react/24/outline/CurrencyDollarIcon'
import BoltIcon  from '@heroicons/react/24/outline/BoltIcon'
import { formatPrice } from '../../../components/Input/Format'

function PageStats({depositPriceTotal,contractPriceTotal}){
    return(
        <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <CurrencyDollarIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Tổng số tiền của hợp đồng cọc</div>
    <div className="stat-value" style={{ fontSize: '25px' }}>{`${formatPrice(depositPriceTotal)} VND`}</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <CurrencyDollarIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Tổng số tiền hợp đồng thuê</div>
    <div className="stat-value" style={{ fontSize: '25px' }}>{`${formatPrice(contractPriceTotal)} VND`}</div>
  </div>
</div>
    )
}

export default PageStats