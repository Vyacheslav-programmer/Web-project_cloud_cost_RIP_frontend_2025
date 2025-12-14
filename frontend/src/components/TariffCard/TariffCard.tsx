import {Button, Card, CardBody, CardText, CardTitle, Col} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch} from "store/store.ts";
import {addTariffToForecast} from "store/slices/tariffsSlice.ts";
import {fetchCartData} from "store/slices/forecastsSlice.ts";
import {TariffItem} from "src/api/Api.ts";

type Props = {
    tariff: TariffItem,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
}

const TariffCard = ({tariff,  showAddBtn=false}:Props) => {

    const dispatch = useAppDispatch()

    const handeAddToDraftForecast = async () => {
        if (tariff) {
            await dispatch(addTariffToForecast(tariff.id))
            await dispatch(fetchCartData())
        }
    }

    return (
        <Card key={tariff.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={tariff.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {tariff.name}
                </CardTitle>
                <CardText>
                    Цена: {tariff.price} руб.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/tariffs/${tariff.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftForecast}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default TariffCard
