import { RequestHandler } from 'express'
import createError from 'http-errors'
import { connectClient } from './client'

export const createCharacter: RequestHandler = async (req, res, next) => {
  const { name } = req.body as { name: string }

  try {
    const client = await connectClient()
    const character = await client.character.create({
      data: {
        name,
        createdAt: new Date()
      }
    })

    res.status(201).json({
      data: character,
      message: 'Character created successfully.'
    })
  } catch (error) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const allCharacters: RequestHandler = async (req, res, next) => {
  try {
    const client = await connectClient()
    const allCharacters = await client.character.findMany()

    res.status(200).json({
      totalCharacters: allCharacters.length,
      data: allCharacters
    })
  } catch (error) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const getCharacter: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    const client = await connectClient()
    const queriedCharacter = await client.character.findUnique({
      where: {
        id
      }
    })

    if (!queriedCharacter) {
      return res.status(404).json({
        data: null,
        message: 'Character not found.'
      })
    }

    return res.status(200).json({
      data: queriedCharacter
    })
  } catch (e) {
    const { code } = e as any as { code: string }

    if (code === 'P2023') {
      return next(createError(400, 'Not a valid Id.'))
    }

    return next(createError(500, 'Something went wrong.'))
  }
}
