import React, { Component } from 'react';
import axios from 'axios';
import './BudgetItem.scss';

export default class BudgetItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         item_name: this.props.budget_item.item_name,
         item_cost: this.props.budget_item.item_cost,
         editItem: false,
      }
   }


   updateBudgetItem = async () => {
      const { budget_item_id } = this.props.budget_item;
      const { item_name, item_cost } = this.state;
      // let itemCost = item_cost * 100;
      let res = await axios.put('/api/budget', { item_name, item_cost, budget_item_id });
      await this.setState({
         item_name: res.data.item_name,
         item_cost: res.data.item_cost,
         editItem: false
      })
   }

   deleteBudgetItem = async () => {
      const { budget_item_id } = this.props.budget_item;
      let res = await axios.delete(`/api/budget/${budget_item_id}`);
      this.props.getBudget()
   }


   render() {
      const { item_name, item_cost, budget_item_id } = this.state;
      let cost = item_cost / 100;
      return (
         <div className='budget-item-container'>
            {
               !this.state.editItem ?
                  <>
                     <div className='budget-property item-name'>
                        <p>{item_name}</p>
                     </div>
                     <div className='budget-property'>
                        <p>${cost}</p>
                     </div>
                     <div className="budget-button-container budget-property">
                        <p onClick={() => this.setState({editItem: true})} className='list-icon'>
                           <i className="fas fa-edit"></i>
                        </p>
                        <p onClick={() => this.deleteBudgetItem()} className='list-icon'>
                           <i className="fas fa-trash"></i>
                        </p>
                     </div>
                  </>
                  :
                  <>
                     <div className='budget-property item-name'>
                        <input 
                           type="text"
                           defaultValue={item_name}
                           onChange={(e) => this.setState({item_name: e.target.value})}
                        />
                     </div>
                     <div className='budget-property'>
                     <input 
                        type="text" 
                        defaultValue={item_cost / 100}
                        onChange={(e) => this.setState({item_cost: e.target.value})}
                     />
                     </div>
                     <div className="budget-button-container budget-property">
                        <p onClick={() => this.setState({editItem: false})} className='list-icon'>
                           <i className="fas fa-times budget-cancel-icon"></i>
                        </p>
                        <p onClick={this.updateBudgetItem} className='list-icon budget-submit-icon'>
                           <i className="fas fa-check"></i>
                        </p>
                     </div>
                  </>
            }
         </div>
      )
   }
}
