// topological sort
export function findAllRecipes(
    recipes: string[],
    ingredients: string[][],
    supplies: string[]
): string[] {
    const graph = new Map<string, string[]>();
    const degree = new Map<string, number>();

    for (let idx = 0; idx < recipes.length; idx++) {
        const recipe = recipes[idx];
        degree.set(recipe, ingredients[idx].length);

        for (const ingredient of ingredients[idx]) {
            const neighbors = graph.get(ingredient);

            if (neighbors) {
                neighbors.push(recipe);
            } else {
                graph.set(ingredient, [recipe]);
            }
        }
    }

    const output = [];
    const queue = [...supplies];

    while (queue.length) {
        const ingredient = queue.shift();

        for (const recipe of graph.get(ingredient) || []) {
            const count = degree.get(recipe) - 1;
            degree.set(recipe, count);

            if (count === 0) {
                queue.push(recipe);
                output.push(recipe);
            }
        }
    }

    return output;
}

// DFS solution
export function findAllRecipesDfs(
    recipes: string[],
    ingredients: string[][],
    supplies: string[]
): string[] {
    const supplySet = new Set<string>(supplies);
    const canCreate = new Set<string>();
    const ingredientMap = new Map<string, string[]>();

    for (let idx = 0; idx < recipes.length; idx++) {
        ingredientMap.set(recipes[idx], ingredients[idx]);
    }

    const dfs = (recipe: string, seen: Set<string>) => {
        if (supplySet.has(recipe) || canCreate.has(recipe)) {
            return true;
        }
        if (seen.has(recipe)) {
            return false;
        }

        const ings = ingredientMap.get(recipe);
        if (!ings) {
            return false;
        }
        seen.add(recipe);

        for (const ing of ings) {
            if (canCreate.has(ing)) {
                continue;
            }
            if (!dfs(ing, seen)) {
                return false;
            }
        }
        canCreate.add(recipe);
        return true;
    };

    for (const recipe of recipes) {
        dfs(recipe, new Set<string>());
    }
    return [...canCreate];
}
