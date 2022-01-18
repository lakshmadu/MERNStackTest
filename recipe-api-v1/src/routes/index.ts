import { Router } from "express"
import { getRecipe, addRecipe,updateRecipe,deleteRecipe  } from "../controllers/recipe/index"

const router: Router = Router()

router.get("/recipes", getRecipe)

router.post("/add-recipe", addRecipe)

router.put("/edit-recipe/:id", updateRecipe)

router.delete("/delete-recipe/:id", deleteRecipe)

export default router