const { Router } = require("express");
const { getPlans, getPlan, postPlan, searchPlansByName, patchPlan, deletePlan } = require("../controllers/plans");

const router = Router();

router.get("/", getPlans);

router.get("/search", searchPlansByName); 

router.get("/:id", getPlan);

router.post("/", postPlan);

router.patch("/:id", patchPlan);

router.delete("/:id", deletePlan);

module.exports = router;