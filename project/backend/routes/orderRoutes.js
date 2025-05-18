// backend/routes/orderRoutes.js
import express from 'express';
import { createOrderWithItems, getOrders, getOrderById, updateOrderStatus } from '../models/orderModel.js';

const router = express.Router();

// Criar um pedido completo (pedido + itens)
router.post('/orders', async (req, res) => {
    const { orderData, cartItems, paymentDetails } = req.body;

    if (!orderData || !cartItems || cartItems.length === 0 || !paymentDetails) {
        return res.status(400).json({ success: false, message: 'Dados do pedido ou pagamento inválidos.' });
    }

    try {
        const orderId = await createOrderWithItems(orderData, cartItems, paymentDetails);
        res.status(201).json({ success: true, orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao criar o pedido.' });
    }
});

export default router;
