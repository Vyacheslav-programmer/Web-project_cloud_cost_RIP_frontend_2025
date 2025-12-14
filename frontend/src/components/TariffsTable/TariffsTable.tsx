import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteTariff} from "store/slices/tariffsSlice.ts";
import {useAppDispatch} from "store/store.ts";
import {Tariffs} from "src/api/Api.ts";

type Props = {
    tariffs:Tariffs[]
}

const TariffsTable = ({tariffs}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (tariff_id:number) => {
        navigate(`/tariffs/${tariff_id}`)
    }

    const openTariffEditPage = (tariff_id:number) => {
        navigate(`/tariffs/${tariff_id}/edit`)
    }

    const handleDeleteTariff = async (tariff_id:string) => {
        dispatch(deleteTariff(tariff_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ value }:any) => <img src={value} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openTariffEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteTariff(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!tariffs.length) {
        return null
    }

    return (
        <CustomTable columns={columns} data={tariffs} onClick={handleClick} />
    )
};

export default TariffsTable
