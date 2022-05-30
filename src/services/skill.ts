import { RequestHandler } from 'express'
import createError from 'http-errors'
import { connectClient } from './client'

export const createSkill: RequestHandler = async (req, res, next) => {
  const { name, description, damage, energyNeed, type } = req.body

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
