import userModel from "../models/userModel.js";
import axios from 'axios';
import FormData from 'form-data';

export const generateImage = async (req, res) => {
    try {
        const userId = req.userId; // set from auth middleware
        const { prompt } = req.body;

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { creditBalance: user.creditBalance - 1 },
            { new: true }
        );

        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: updatedUser.creditBalance,
            resultImage,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
