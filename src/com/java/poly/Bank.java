package com.java.poly;

public class Bank {
	int amount;
	double interest;
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public double getInterest() {
		return interest;
	}
	public void setInterest(double interest) {
		this.interest = interest;
	}
	public void setInterest(float interest) {
		this.interest = interest;
	}
	public void setInterest(int interest) {
		this.interest = interest;
	}
	public String calulate() {
		return ""+(amount+((getInterest()/100)*amount))+"";
	}
}
