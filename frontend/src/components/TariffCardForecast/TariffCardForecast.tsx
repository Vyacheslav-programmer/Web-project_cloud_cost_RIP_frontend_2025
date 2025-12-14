import {Button, Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useEffect, useState} from "react";
import {removeTariffFromDraftForecast, updateTariffValue} from "store/slices/forecastsSlice.ts";
import {TariffItem} from "src/api/Api.ts";
import CustomInputNumber from "components/CustomInputNumber/CustomInputNumber.tsx";

type Props = {
    tariff: TariffItem,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
    saveMM?: boolean,
}

const TariffCardForecast = ({tariff, showRemoveBtn=false, editMM=false, saveMM}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser=false} = useAppSelector((state) => state.user)

    const [local_mmfield, setLocal_mmfield] = useState(tariff.count as number)

    const handleRemoveFromDraftForecast = async () => {
        await dispatch(removeTariffFromDraftForecast(tariff.id))
    }

    useEffect(() => {
        if (saveMM != null) {
            void updateValue()
        }
    }, [saveMM]);

    const updateValue = async () => {
        if (local_mmfield) {
            dispatch(updateTariffValue({
                tariff_id: tariff.id,
                count: local_mmfield
            }))
        }
    }

    return (
        <Card key={tariff.id}>
            <Row className="p-2">
                <Col md={2} className="d-flex justify-content-center align-items-center">
                    <CardImg
                        src={tariff.image}
                        style={{"width": "100%"}}
                    />
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center">
                    <CardTitle tag="h5">
                        {tariff.name}
                    </CardTitle>
                </Col>
                <Col md={2} className="d-flex justify-content-center align-items-center">
                    <CardText className="text-center">
                        {tariff.price} руб.
                    </CardText>
                </Col>
                <Col md={3} className="d-flex justify-content-center align-items-center">
                    <CustomInputNumber value={local_mmfield || 0} setValue={setLocal_mmfield} disabled={!editMM || is_superuser}/>
                </Col>
                <Col md={3} className="d-flex justify-content-center align-items-center gap-3">
                    <Link to={`/tariffs/${tariff.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showRemoveBtn &&
                        <Button color="danger" onClick={handleRemoveFromDraftForecast}>
                            Удалить
                        </Button>
                    }
                </Col>
            </Row>
        </Card>
    );
};

export default TariffCardForecast
