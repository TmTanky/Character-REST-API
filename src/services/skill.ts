import { RequestHandler } from 'express'
import createError from 'http-errors'
import { connectClient } from './client'

export const createSkill: RequestHandler = async (req, res, next) => {
  const { name, description, damage, energyNeed, type } = req.body

  if (!name || !description || !damage || !energyNeed || !type) {
    return next(createError(400, 'All fields are required.'))
  }

  try {
    const client = await connectClient()
    const newSkill = await client.skill.create({
      data: {
        name,
        description,
        damage,
        energyNeed,
        type
      }
    })

    res.status(201).json({
      message: 'Skill created',
      data: newSkill
    })
  } catch (e) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const querySkill: RequestHandler = async (req, res, next) => {
  const { name } = req.query as { name: string }

  if (!name) return next(createError(400, 'Name is required.'))

  try {
    const client = await connectClient()
    const queriedSkill = await client.skill.findFirst({
      where: {
        name: {
          contains: name
        }
      }
    })

    if (!queriedSkill) {
      return next(createError(404, 'Skill not found.'))
    }

    res.status(201).json({
      data: queriedSkill
    })
  } catch (e) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const getAllSkills: RequestHandler = async (req, res, next) => {
  try {
    const client = await connectClient()
    const allSkills = await client.skill.findMany()

    res.status(201).json({
      data: allSkills
    })
  } catch (e) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const updateSkill: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const { name, description, damage, energyNeed, type } = req.body

  if (!name || !description || !damage || !energyNeed || !type || id) {
    return next(createError(400, 'All fields are required.'))
  }

  try {
    const client = await connectClient()
    const toBeUpdated = await client.skill.update({
      data: {
        name,
        description,
        energyNeed,
        damage,
        type
      },
      where: { id }
    })

    if (!toBeUpdated) {
      return next(createError(404, 'Skill not found.'))
    }

    return res.status(201).json({
      message: 'Update Successful',
      data: toBeUpdated
    })
  } catch (error) {
    const { code } = error as any as { code: string }
    if (code === 'P2025') return next(createError(400, 'Skill not found.'))

    return next(createError(500, 'Something went wrong.'))
  }
}

export const deleteSkill: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  if (!id) return next(createError(400, 'Id is required.'))

  try {
    const client = await connectClient()
    await client.skill.delete({
      where: {
        id
      }
    })

    return res.status(204)
  } catch (error) {
    const { code } = error as any as { code: string }
    if (code === 'P2025') return next(createError(400, 'Skill not found.'))

    return next(createError(500, 'Something went wrong.'))
  }
}
