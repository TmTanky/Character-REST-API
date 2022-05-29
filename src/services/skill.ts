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
    console.log(name)
    const client = await connectClient()
    const queriedSkill = await client.skill.findFirst({
      where: {
        AND: [{ name: { contains: name } }]
      }
    })

    res.status(201).json({
      data: queriedSkill
    })
  } catch (e) {
    return next(createError(500, 'Something went wrong.'))
  }
}
