import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";

function App({ user }) {
    // loading이 true이면 현재 데이터를 읽고 있는 중입니다.
    const [loading, setLoading] = useState(true);

    // 오류 정보를 저장할 스테이트
    const [error, setError] = useState('');

    // 주문 목록들을 저장할 스테이트(초기 값 : 빈 배열)
    const [orders, setOrders] = useState([]);

    // 다음의 hook은 사용자 정보 user가 변경될 때 마다 rendering 됩니다.
    useEffect(() => {
        if (!user) {
            setError('로그인이 필요합니다.');
            setLoading(false);
        }

        // 스프링 부트의 OrderController의 getOrderList() 메소드 참조
        const fetchOrders = async () => {
            try {
                const url = `${API_BASE_URL}/order/list`;

                // get 방식은 파라미터를 넘길 때, params라는 키를 사용하여 넘겨야 합니다.
                const parameters = {
                    params: { memberId: user.id, role: user.role },
                    withCredentials: true
                };

                const response = await axios.get(url, parameters);

                //console.log(response.data);
                setOrders(response.data);

            } catch (error) {
                setError('주문 목록을 불러 오는 데 실패하였습니다.');
                console.log(error);

            } finally {
                setLoading(false);
            };
        };

        fetchOrders(); // 함수 호출

    }, [user]);

    const makeStatusButton = (bean) => {
        if (user?.role !== "ADMIN" && user?.role !== "USER") return null;

        return (
            <div className="d-flex align-items-center">
                {/* ✅ 관리자일 때 사용자 이름 표시 */}
                {user?.role === 'ADMIN' && (
                    <span
                        className="me-3 px-3 py-1 border rounded fw-bold text-primary"
                        style={{
                            borderColor: '#0d6efd',   // 테두리 색상 (Bootstrap primary)
                            backgroundColor: 'transparent', // 내부 채우기 제거
                            fontSize: '0.9rem',
                        }}
                    >
                        👤 {bean.name}
                    </span>
                )}
                {/* `완료` 버튼은 관리자만 볼수 있습니다. */}
                {user?.role === 'ADMIN' && (
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={``}>
                        완료
                    </Button>
                )}

                <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={``}>
                    취소
                </Button>
            </div>
        );
    };


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">주문 목록을 불러오는 중입니다.</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <h1 className="my-4">주문 내역</h1>
            {orders.length === 0 ? (
                <Alert variant="secondary">주문 내역이 없습니다.</Alert>
            ) : (
                <Row>
                    {orders.map((bean) => (
                        <Col key={bean.orderId} md={6} className="mb-4">
                            <Card
                                className="h-100 shadow-sm"
                                style={{
                                    border: '2px solid #495057'
                                }}
                            >
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <Card.Title>주문 번호 : {bean.orderId}</Card.Title>
                                        <small className="text-muted">{bean.orderDate}</small>
                                    </div>

                                    <Card.Text>
                                        상태 : <strong>{bean.status}</strong>
                                    </Card.Text>

                                    <ul style={{ paddingLeft: "20px" }}>
                                        {bean.orderItems.map((item, index) => (
                                            <li key={index}>
                                                {item.productName}({item.quantity}개)
                                            </li>
                                        ))}
                                    </ul>

                                    {/* 주문 상태 변경 버튼 생성 */}
                                    {makeStatusButton(bean)}

                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default App;