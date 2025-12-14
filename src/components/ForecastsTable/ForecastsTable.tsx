import {Forecast, Forecasts} from "src/api/Api.ts";
import {Col, Row} from "reactstrap";
import ForecastCard from "components/ForecastCard/ForecastCard.tsx";

type Props = {
    forecasts:Forecasts[]
}

const ForecastsTable = ({forecasts}:Props) => {
    return (
        <div>
            <Row className="mb-3 p-2">
                <Col md="1" className="d-flex justify-content-center">
                    <h5 className="text-center">№</h5>
                </Col>
                <Col md="1" className="d-flex justify-content-center">
                    <h5 className="text-center">Статус</h5>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h5 className="text-center">Вычисляемое поле</h5>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h5 className="text-center">Дата создания</h5>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h5 className="text-center">Дата формирования</h5>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h5 className="text-center">Дата завершения</h5>
                </Col>
                <Col md="2" className="d-flex justify-content-center">
                    <h5 className="text-center">Действие</h5>
                </Col>
            </Row>
            {forecasts.map((forecast:Forecast) => (
                <Row key={forecast.id} className="d-flex justify-content-center mb-3">
                    <ForecastCard forecast={forecast} />
                </Row>
            ))}
        </div>
    )
};

export default ForecastsTable
