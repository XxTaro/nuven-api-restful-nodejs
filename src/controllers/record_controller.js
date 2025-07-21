import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

export const getRecordsByQuery = async (req, res) => {
    const { query: query } = req.query;
    
    if (!query) {
        return res.status(400).json({ message: 'Uma palavra chave é necessária.' });
    }
    
    try {
        const records = await prisma.$queryRaw
            `
                SELECT * FROM "records"
                WHERE EXISTS (
                    SELECT 1
                    FROM jsonb_each_text(json_data) AS item(key, value)
                    WHERE value ILIKE ${'%' + query + '%'}
                );
            `
        ;
    
        if (records.length === 0) {
        return res.status(404).json({ message: 'No records found for the given keyword.' });
        }
    
        res.json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};