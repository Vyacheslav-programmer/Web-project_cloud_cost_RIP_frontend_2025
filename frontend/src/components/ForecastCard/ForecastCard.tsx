import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {Forecast} from "src/api/Api.ts";
import {formatDate, formatprice} from "utils/utils.ts";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptForecast, fetchForecasts, rejectForecast} from "store/slices/forecastsSlice.ts";
import {E_ForecastStatus} from "modules/types.ts";

type Props = {
    forecast: Forecast
}

const STATUSES:Record<number, string> = {
    1: "Введен",
    2: "В работе",
    3: "Завершен",
    4: "Отменён",
    5: "Удалён"
}

const ForecastCard = ({forecast}:Props) => {
    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptForecast = async () => {
        await dispatch(acceptForecast(forecast.id.toString()))
        await dispatch(fetchForecasts())
    }

    const handleRejectForecast = async () => {
        await dispatch(rejectForecast(forecast.id.toString()))
        await dispatch(fetchForecasts())
    }

    const isInWork = forecast.status == E_ForecastStatus.InWork

    if (is_superuser) {
        return (
            <Card>
                <Row className="p-2">
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                        <CardText>{forecast.id}</CardText>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                        <CardTitle tag="h5">
                            {STATUSES[forecast.status as unknown as number]}
                        </CardTitle>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center align-items-center">
                        {forecast.price &&
                            <CardText className="text-center">
                                {formatprice(forecast.price)}
                            </CardText>
                        }
                    </Col>
                    <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                        <CardText className="text-center">
                            {formatDate(forecast.date_formation as string, true)}
                        </CardText>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                        <CardText className="text-center">
                            {formatDate(forecast.date_complete as string, true)}
                        </CardText>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                        {forecast.owner}
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center gap-3">
                        {isInWork &&
                            <Button color="success" type="button" onClick={handleAcceptForecast}>
                                Завершить
                            </Button>
                        }
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center gap-3">
                        {isInWork &&
                            <Button color="danger" type="button" onClick={handleRejectForecast}>
                                Отклонить
                            </Button>
                        }
                    </Col>
                </Row>
            </Card>
        )
    }

    return (
        <Card>
            <Row className="p-2">
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    <CardText>{forecast.id}</CardText>
                </Col>
                <Col md={1} className="d-flex justify-content-center align-items-center">
                    <CardTitle tag="h5">
                        {STATUSES[forecast.status as unknown as number]}
                    </CardTitle>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center">
                    {forecast.price &&
                        <CardText className="text-center">
                            {formatprice(forecast.price)}
                        </CardText>
                    }
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <CardText className="text-center">
                        {formatDate(forecast.date_created as string, true)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <CardText className="text-center">
                        {formatDate(forecast.date_formation as string, true)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <CardText className="text-center">
                        {formatDate(forecast.date_complete as string, true)}
                    </CardText>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center gap-3">
                    <Link to={`/forecasts/${forecast.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Card>
    )
}

export default ForecastCard
