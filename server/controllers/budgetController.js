module.exports = {
   getBudget: async (req, res) => {
      const db = req.app.get('db');
      const { trip_id } = req.params;
      const budget = await db.budget.get_budget_items({ trip_id });
      res.status(200).send(budget);
   },
   addBudgetItem: async (req, res) => {
      const db = req.app.get('db');
      const { item_name, item_cost, trip_id } = req.body;
      const newItem = await db.budget.add_budget_item({ item_name, item_cost, trip_id });
      res.status(200).send(newItem)
   },
   updateBudgetItem: async (req, res) => {
      const db = req.app.get('db');
      const { item_name, item_cost, budget_item_id } = req.body;
      const updatedItem = await db.budget.edit_budget_item({ item_name, item_cost, budget_item_id });
      res.status(200).send(updatedItem[0])
   },
   deleteBudgetItem: async (req, res) => {
      const db = req.app.get('db');
      const { budget_item_id } = req.params;
      const deletedItem = await db.budget.delete_budget_item({ budget_item_id });
      res.status(200).send(deletedItem[0])
   },
};