import { Router } from 'express'
import * as call from '../../services/skill'

const router = Router()

router.get('/skills', call.getAllSkills)
router.route('/skill').get(call.querySkill).post(call.createSkill)

export default router
