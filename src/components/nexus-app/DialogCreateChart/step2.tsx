"use client";
import {
	DialogHeader,
	DialogTitle,
  } from "@/components/ui/dialog";
import { fetchData } from "@/lib/fetch";
import { useAppStore } from "@/store/appStore";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from 'react';
import CircleLoader from "../Loader/CircleLoader";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, SearchCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step2CreateChartProps {
	setChart: (chart: any) => void;
	chartDatabase: string
}	

const Step2CreateChart: React.FC<Step2CreateChartProps> = ({setChart, chartDatabase}) => {
	const t = useTranslations('chart');

	const account: any = useAppStore((state) => state.account);

	const [database, setDatabase] = useState<any>(null);
	const [databaseSelected, setDatabaseSelected] = useState<any>(chartDatabase);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				const response = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}notion/get-databases`, {
					body: JSON.stringify({
						accountId: account.id,
					}),
				});
				const data = await response.json();
				setDatabase(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchDataAsync();
	}, [account.id]);

	const filterOnSearch = (value: string, search: string) => {
		const db = database.find((db: any) => db.id === value)
		return db.title.toLowerCase().includes(search.toLowerCase())	
	}

	const getTitle = (id: string) => {
		const db = database.find((db: any) => db.id === id)
		return (
			<div className="flex items-center">
				{db?.icon?.url && (
					<img src={db.icon.url} alt={db.title} className="w-4 h-4 mr-2" />
				)}
				{db?.icon?.emoji && (
					<span className="w-4 h-4 mr-2">{db.icon.emoji}</span>
				)}
				<span>{db?.title}</span>
			</div>
		)
	}

	const onSelect = (currentValue: string) => {
		setDatabaseSelected(currentValue);
		setChart({database: currentValue});
		setOpen(false);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>{t("title_create_chart_step_2")}</DialogTitle>
			</DialogHeader>
			<div className="flex justify-center items-center w-full">
				{database?.length > 0 ? (
					<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
					  <Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					  >
						{databaseSelected != undefined
						  ? getTitle(databaseSelected)
						  : t("select_database")}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					  </Button>
					</PopoverTrigger>
					<PopoverContent className="w-[500px] p-0" align="start">
					  <Command filter={(value, search) => filterOnSearch(value, search)}>
						<CommandInput placeholder={t("select_database")} className="h-9" />
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandList>
							<CommandGroup>
							{database && database.map((db: any) => (
								<CommandItem className="flex items-center" value={db.id} key={db.title} onSelect={(currentValue) => {onSelect(currentValue)}}>
									{getTitle(db.id)}
									<CheckIcon
										className={cn(
										"ml-auto h-4 w-4",
										databaseSelected === db.id ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
							</CommandGroup>
						</CommandList>
					  </Command>
					</PopoverContent>
				  </Popover>
				):(
					<CircleLoader/>
				)}
			</div>
		</>
	);
};

export default Step2CreateChart;