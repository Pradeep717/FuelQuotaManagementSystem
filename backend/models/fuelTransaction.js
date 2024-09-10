import mongoose from 'mongoose';

const fuelTransactionSchema = new mongoose.Schema(
    {
        vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
        },
        fuelStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FuelStation',
        required: true,
        },
        fuelType: {
        type: String,
        enum: ['petrol', 'diesel'],
        required: true,
        },
        litresPumped: {
        type: Number,
        required: true,
        },
        quotaBefore: {
        type: Number,
        required: true,
        },
        quotaAfter: {
        type: Number,
        required: true,
        },
        status: {
        type: String,
        enum: ['completed', 'failed'],
        default: 'success',
        },
    },
    {
        timestamps: true,
    }
    );

const FuelTransaction = mongoose.model('FuelTransaction', fuelTransactionSchema);

export default FuelTransaction;

