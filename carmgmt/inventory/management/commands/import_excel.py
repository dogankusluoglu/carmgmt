# inventory/management/commands/import_excel.py
import pandas as pd
from django.core.management.base import BaseCommand
from inventory.models import Stock, Record

class Command(BaseCommand):
    help = 'Import data from Excel workbook'

    def handle(self, *args, **options):
        # Path to your Excel file:
        excel_file = '/home/dogan/carmgmt/carmgmt/carsforall exp 14012025 (version 1).xlsb.xlsx'
        
        # Read the sheets:
        stock_df = pd.read_excel(excel_file, sheet_name='stock')
        records_df = pd.read_excel(excel_file, sheet_name='records')
        
        # Clean up column names: Convert each column name to a string and strip spaces.
        stock_df.columns = [str(col).strip() for col in stock_df.columns]
        records_df.columns = [str(col).strip() for col in records_df.columns]
        
        # Debug prints: show the column names for both sheets.
        print("Columns in the stock sheet:", stock_df.columns.tolist())
        print("Columns in the records sheet:", records_df.columns.tolist())
        
        # Drop rows that don't have a linking value.
        stock_df = stock_df.dropna(subset=['MAL NO'])
        records_df = records_df.dropna(subset=['stock n0'])
        
        # --- Import Stock Data ---
        for _, row in stock_df.iterrows():
            mal_no_value = str(row['MAL NO']).strip()[:50]
            model_name = str(row.get('stock list', '')).strip()[:100]
            status_val = str(row.get('status', '')).strip()[:20]
            month_val = str(row.get('month', '')).strip()[:20]
            
            cost_val = row.get('maliyet', 0)
            if pd.isna(cost_val):
                cost_val = 0

            Stock.objects.update_or_create(
                mal_no=mal_no_value,
                defaults={
                    'model_name': model_name,
                    'status': status_val,
                    'month': month_val,
                    'cost': cost_val
                }
            )
        
        # --- Import Record Data ---
        for _, row in records_df.iterrows():
            mal_no_value = str(row['stock n0']).strip()[:50]
            try:
                stock_instance = Stock.objects.get(mal_no=mal_no_value)
            except Stock.DoesNotExist:
                print(f"Stock with MAL NO {mal_no_value} not found, skipping record.")
                continue
            
            # Process the date field.
            date_field = row.get('date')
            if pd.isna(date_field):
                print(f"Record with stock n0 {mal_no_value} has no date, skipping record.")
                continue
            if isinstance(date_field, pd.Timestamp):
                date_field = date_field.date()
            elif isinstance(date_field, str):
                try:
                    date_field = pd.to_datetime(date_field, dayfirst=True).date()
                except Exception as e:
                    print(f"Could not parse date '{date_field}' for record with stock n0 {mal_no_value}: {e}")
                    continue
            else:
                try:
                    date_field = pd.to_datetime(date_field, dayfirst=True).date()
                except Exception as e:
                    print(f"Could not parse date for record with stock n0 {mal_no_value}: {e}")
                    continue
            
            # Process the amount field.
            amount_val = row.get('amount', 0)
            if pd.isna(amount_val):
                amount_val = 0

            # Truncate transaction_type and description to 50 characters.
            transaction_type = str(row.get('item', '')).strip()[:50]
            description = str(row.get('spender', '')).strip()[:50]
            
            Record.objects.create(
                stock=stock_instance,
                transaction_type=transaction_type,
                amount=amount_val,
                transaction_date=date_field,
                description=description
            )
        
        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
