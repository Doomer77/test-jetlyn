import { FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IUser } from './types'
import { Loader, Button } from './components'
import './App.css'
import { UserList } from './components/UserList'
import ArrowDown from '../src/2353495.png'
import { UserDetails } from './components/UserDetails'

enum ButtonName {
    SMALLDATA = 'Небольшой объем данных',
    BIGDATA = 'Большой объем данных',
    ERROR = 'Запрос с ошибкой"',
}

enum Url {
    SMALLDATA = '={date}',
    BIGDATA = '={date}&delay=3',
    ERROR = '={date}&delay=1&err=408',
}

const url =
    'http://www.filltext.com/?rows=10&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&message=%7Blorem%7C32%7D&timestamp'

export const App: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [scroll, setScroll] = useState<boolean>(false)
    const [rowItem, setRowItem] = useState<string>('')
    const containerRef: any = useRef(null)

    useEffect(() => {
        if (containerRef?.current) {
            setScroll(containerRef.current.scrollHeight > window.innerHeight)
        }
    }, [users, loading])

    async function fetchUsers(uri: string) {
        try {
            setLoading(true)
            const response = await axios.get<IUser[]>(uri)
            setUsers(response.data)
            setError(null)
            setLoading(false)
        } catch (error: any) {
            setError(error.message)
            setUsers([])
            setLoading(false)
        }
    }

    const heandlerRequestData = (
        event: React.MouseEvent<HTMLElement>,
        name: string
    ) => {
        switch (name) {
            case ButtonName.SMALLDATA:
                fetchUsers(`${url}${Url.SMALLDATA}`)
                break
            case ButtonName.BIGDATA:
                fetchUsers(`${url}${Url.BIGDATA}`)
                break
            case ButtonName.ERROR:
                fetchUsers(`${url}${Url.ERROR}`)
                break
            default:
                break
        }
    }

    const onScrollHeandler = (event: React.MouseEvent<HTMLElement>) => {
        window.scrollBy(0, window.innerHeight)
    }

    const detailsRow = (row: any) => {
        setRowItem(row)
    }

    return (
        <div className="app" ref={containerRef}>
            {scroll && (
                <Button variant="dot">
                    <img
                        src={ArrowDown}
                        alt="alt"
                        className="arrow-img"
                        onClick={onScrollHeandler}
                    />
                </Button>
            )}

            <div className="btn-container">
                <Button
                    variant={'rectangle'}
                    onClick={heandlerRequestData}
                    name={ButtonName.SMALLDATA}
                />
                <Button
                    variant={'rectangle'}
                    onClick={heandlerRequestData}
                    name={ButtonName.BIGDATA}
                />
                <Button
                    variant={'rectangle'}
                    onClick={heandlerRequestData}
                    name={ButtonName.ERROR}
                ></Button>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <UserList users={users} detailsRow={detailsRow} />
            )}
            <UserDetails detailsData={rowItem} />
        </div>
    )
}
