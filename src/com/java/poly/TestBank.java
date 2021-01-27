package com.java.poly;

import java.util.Scanner;

public class TestBank {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int amount,option;
		Scanner s=new Scanner(System.in);
		System.out.println("Select Bank :");
		System.out.println("1.ICICI\n2.AXIS\n3.SBI");
		option=s.nextInt();
		System.out.println("Enter Amount: ");
		amount=s.nextInt();
		
		Bank icici=new ICICI();
		Bank axis=new AXIS();
		Bank sbi=new SBI();
		
		switch(option) {
		case 1: 
			icici.setAmount(amount);
			icici.setInterest(7.3f);
			System.out.println(icici.calulate());
			break;
		case 2: 
			axis.setAmount(amount);
			axis.setInterest(9.50);
			System.out.println(axis.calulate());
			break;
		case 3: 
			sbi.setAmount(amount);
			sbi.setInterest(8);
			System.out.println(sbi.calulate());
			break;
		default:
			System.out.println("Invaild Option");
			break;
		}
	}

}
