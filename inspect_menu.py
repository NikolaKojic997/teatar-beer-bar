
import pandas as pd
import sys

try:
    df = pd.read_excel('public/menu.xlsx')
    
    print("Columns found:", df.columns.tolist())
    
    print("\nUnique values in 'Tip':")
    print(df['Tip'].unique())
    
    print("\nUnique values in 'Grupa' (sorted):")
    # Convert to string to avoid comparison issues with mixed types if any
    unique_groups = sorted([str(x) for x in df['Grupa'].unique()])
    for g in unique_groups:
        print(g)
        
    print("\nRows with 'vino' in Naziv or Grupa (first 20):")
    # Filter for wine related items
    wine_items = df[df['Naziv'].astype(str).str.lower().str.contains('vino') | df['Grupa'].astype(str).str.lower().str.contains('vino')]
    print(wine_items[['Naziv', 'Grupa']].head(20))

except Exception as e:
    print(f"Error reading excel file: {e}")
