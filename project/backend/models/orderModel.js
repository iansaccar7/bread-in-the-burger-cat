// backend/models/orderModel.js
import { db } from './db.js';

// Criar um novo pedido e inserir os itens juntos
export const createOrderWithItems = async (orderData, cartItems, paymentDetails) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // Inserir o pedido principal com o status de pagamento
        const [orderResult] = await connection.query(
            'INSERT INTO orders (customer_name, customer_email, customer_phone, payment_method, address, payment_status, payment_transaction_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                orderData.customerName,
                orderData.customerEmail,
                orderData.customerPhone,
                orderData.paymentMethod,
                orderData.address,
                paymentDetails.paymentStatus,  // 'approved' ou 'pending'
                paymentDetails.transactionId    // ID da transação gerado pela plataforma de pagamento
            ]
        );
        const orderId = orderResult.insertId;

        // Inserir os itens do pedido
        const itemQueries = cartItems.map(item =>
            connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            )
        );

        await Promise.all(itemQueries);

        await connection.commit();
        connection.release();

        return orderId;
    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};

// As funções anteriores (getOrders, getOrderById, updateOrderStatus) continuam iguais
