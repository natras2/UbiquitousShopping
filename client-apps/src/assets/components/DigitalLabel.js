import { FaArrowLeft, FaLocationDot, FaHashtag, FaTag, FaHourglassHalf, FaCompass } from "react-icons/fa6";

function DigitalLabel(props) {

    const date = new Date(Date.parse(props.data.merch.expiration_date));
    const dateCheck = (date - new Date()) / 1000 / 60 / 60 / 24;

    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    })

    const nutritionalList = [];
    const nutritionalInfo = Object.keys(props.data.merch.nutritional_info);
    for (let i = 0; i < Math.min( nutritionalInfo.length, 8); i++) {
        nutritionalList.push(
            <div key={nutritionalInfo[i]} className="nutritional-record">
                <div className="nutritional-property">{nutritionalInfo[i].replace('_', ' ')}</div>
                <div className="nutritional-value">{props.data.merch.nutritional_info[nutritionalInfo[i]]}</div>
            </div>
        );
    }

    return (
        <div>
            {(!!props.goBack) && 
                <div className="back-button" onClick={() => props.goBack()}> 
                    <FaArrowLeft /> {props.textBack}
                </div>
            }
            <div className="digitallabel">
                <div className="name">{props.data.merch.name}</div>
                <div className="merchlot-info">
                    <div className="store-name"><FaLocationDot /> {JSON.parse(sessionStorage.getItem('store')).name}</div>
                    <div className="merchlot-id"><FaHashtag /> Lot: {props.data.merch.traceability_info.lot_number}</div>
                </div>
                <div className="price"><FaTag /> {formatter.format((props.data.merch.price_per_milligram * 1000000))} per kg</div>
                <div className="description">{props.data.merch.description}</div>
                <div className="info-cards">
                    <div className={`best-before ${ (dateCheck < 3) ? 'critical': (dateCheck < 3) ? 'warning' : '' }`}>
                        <div className="intro"><FaHourglassHalf /> Best before</div>
                        <div className="main">{date.toLocaleDateString('it-IT')}</div>
                    </div>
                    <div className="traceability-infos">
                        <div className="intro"><FaCompass /> Know the artisan</div>
                        <div className="main">{props.data.merch.vendor}</div>
                    </div>
                </div>
                <div className="nutritional-information">
                    <div className="header">Nutritional information</div>
                    <div className="subheader">per 100g of product</div>
                    <div className="nutritional-list">
                        {nutritionalList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DigitalLabel;