import React, { Component } from 'react';
import axios from 'axios';
import './Budget.scss';
import BudgetItem from '../Budget/BudgetItem/BudgetItem';

export default class Budget extends Component {
   constructor(props) {
      super(props);
      this.state = {
         budget: [],
         budgetTotal: 0,
         item_name: '',
         item_cost: '',
      }
   }

   componentDidMount = async () => {
      await this.getBudget()
   }

   getBudget = async () => {
      const trip_id = this.props.trip_id;
      let res = await axios.get(`/api/budget/${trip_id}`)
      await this.setState({
         budget: res.data
      })
      let budgetTotal = this.state.budget.reduce((acc, item) => {
         return acc + item.item_cost / 100
      }, 0)
      await this.setState({
         budgetTotal: budgetTotal
      })
   }

   addBudgetItem = async () => {
      const trip_id = this.props.trip_id;
      const { item_name, item_cost } = this.state;
      let itemCost = item_cost * 100;
      if (item_name.length < 1) {
         alert('Please enter a name for the new budget item')
      } else if (isNaN(item_cost)) {
         alert('Please enter a cost for the new budget item (Must be a number)')
      } else {
         const res = await axios.post('/api/budget', { item_name, item_cost: itemCost, trip_id });
         await this.getBudget();
         await this.setState({
            item_name: '',
            item_cost: ''
         })
      }
   }



   render() {
      const { budget, budgetTotal, item_name, item_cost } = this.state;
      const budgetItemList = budget.map((budgetItem) => {
         const { budget_item_id } = budgetItem
         return (
            <div key={budget_item_id}>
               < BudgetItem
                  budget_item={budgetItem}
                  getBudget={this.getBudget}
               />
            </div>
         )
      })
      return (
         <div className='budget-main-container'>
            <div className='budget-box-header'>
               <h2>Budget</h2>
               <div className='budget-category-container'>
                  <div className='budget-item-category'>Item</div>
                  <div className='budget-cost-category'>Cost</div>
                  <div className='budget-cost-category'></div>
               </div>
            </div>
            <div className="budget-item-list">
               {budgetItemList}
            </div>
            <div>
               <input
                  type="text"
                  placeholder='Name'
                  value={this.state.item_name}
                  ref='name'
                  onChange={(e) => this.setState({ item_name: e.target.value })}
               />
               <input
                  type="text"
                  placeholder='Cost'
                  value={this.state.item_cost}
                  ref='cost'
                  onChange={(e) => this.setState({ item_cost: e.target.value })}
               />
               <button onClick={() => this.addBudgetItem()}>
                  <i className="fas fa-plus"></i>
               </button>
            </div>
            <div className="budget-total">
               Total: ${budgetTotal}
            </div>
         </div>
      )
   }
}
