import { Router } from 'express'
import * as call from '../../services/skill'

const router = Router()

// router.post('/skill', call.createSkill)
router.route('/skill').get(call.querySkill).post(call.createSkill)

export default router
