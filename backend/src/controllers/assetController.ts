import { Request, Response } from 'express';
import { Asset } from '../models/Asset';
import { Op } from 'sequelize';

// Get all assets
export const getAllAssets = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const offset = (+page - 1) * +limit;

    const whereClause: any = {};
    if (type) {
      whereClause.type = type;
    }

    const assets = await Asset.findAndCountAll({
      where: whereClause,
      limit: +limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      assets: assets.rows,
      totalPages: Math.ceil(assets.count / +limit),
      currentPage: +page,
      totalAssets: assets.count
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Server error while fetching assets' });
  }
};

// Search assets
export const searchAssets = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const assets = await Asset.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { hostname: { [Op.iLike]: `%${query}%` } },
          { ipAddress: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } }
        ]
      }
    });

    res.json({ assets });
  } catch (error) {
    console.error('Error searching assets:', error);
    res.status(500).json({ message: 'Server error while searching assets' });
  }
};

// Get asset by ID
export const getAssetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json({ asset });
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ message: 'Server error while fetching asset' });
  }
};

// Create a new asset
export const createAsset = async (req: Request, res: Response) => {
  try {
    const { name, hostname, type, status, ipAddress, description, location, ownerId } = req.body;

    const newAsset = await Asset.create({
      name,
      hostname,
      type,
      status,
      ipAddress,
      description,
      location,
      ownerId
    });

    res.status(201).json({
      message: 'Asset created successfully',
      asset: newAsset
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ message: 'Server error while creating asset' });
  }
};

// Update an asset
export const updateAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, hostname, type, status, ipAddress, description, location, ownerId } = req.body;

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await asset.update({
      name,
      hostname,
      type,
      status,
      ipAddress,
      description,
      location,
      ownerId
    });

    res.json({
      message: 'Asset updated successfully',
      asset
    });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Server error while updating asset' });
  }
};

// Delete an asset
export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await asset.destroy();

    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ message: 'Server error while deleting asset' });
  }
};