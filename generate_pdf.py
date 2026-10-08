import os
import pandas as pd
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Arial font for proper Serbian UTF-8 accents (č, š, ć, đ, ž)
arial_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
arial_bold_path = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'

pdfmetrics.registerFont(TTFont('Arial', arial_path))
pdfmetrics.registerFont(TTFont('Arial-Bold', arial_bold_path))

def build_pdf():
    excel_path = 'public/menu.xlsx'
    pdf_path = 'public/teatar_beer_bar_menu.pdf'
    logo_path = 'public/logo.png'
    
    df = pd.read_excel(excel_path)
    
    # Custom Dark Theme Colors
    BG_COLOR = colors.HexColor('#0F0F11')
    GOLD_COLOR = colors.HexColor('#D4AF37')
    GOLD_LIGHT = colors.HexColor('#F3E5AB')
    TEXT_WHITE = colors.HexColor('#FFFFFF')
    TEXT_MUTED = colors.HexColor('#AAAAAA')
    CARD_BG = colors.HexColor('#1A1A1E')
    LINE_COLOR = colors.HexColor('#2A2A30')
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=30,
        rightMargin=30,
        topMargin=30,
        bottomMargin=30
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'MenuTitle',
        fontName='Arial-Bold',
        fontSize=24,
        leading=28,
        textColor=GOLD_COLOR,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'MenuSubtitle',
        fontName='Arial',
        fontSize=10,
        leading=14,
        textColor=TEXT_MUTED,
        alignment=TA_CENTER,
        spaceAfter=15
    )
    
    category_style = ParagraphStyle(
        'CategoryTitle',
        fontName='Arial-Bold',
        fontSize=14,
        leading=18,
        textColor=GOLD_COLOR,
        spaceBefore=12,
        spaceAfter=6
    )
    
    item_name_style = ParagraphStyle(
        'ItemName',
        fontName='Arial-Bold',
        fontSize=10,
        leading=13,
        textColor=TEXT_WHITE
    )
    
    item_jm_style = ParagraphStyle(
        'ItemJM',
        fontName='Arial',
        fontSize=9,
        leading=12,
        textColor=TEXT_MUTED,
        alignment=TA_CENTER
    )
    
    item_price_style = ParagraphStyle(
        'ItemPrice',
        fontName='Arial-Bold',
        fontSize=10,
        leading=13,
        textColor=GOLD_LIGHT,
        alignment=TA_RIGHT
    )

    story = []
    
    # Logo / Header
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=80, height=80)
        logo_img.hAlign = 'CENTER'
        story.append(logo_img)
        story.append(Spacer(1, 8))
        
    story.append(Paragraph("TEATAR BEER BAR 13", title_style))
    story.append(Paragraph("DIGITALNI MENI &amp; CENOVNIK", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=GOLD_COLOR, spaceBefore=0, spaceAfter=15))
    
    # Custom ordering of categories
    category_order = [
        'KRAFT TOCENA PIVA',
        'INDUSTRIJSKA TOCENA PIVA',
        'INDUSTRIJSKA FLASIRANA PIVA',
        'TOPLI NAPICI',
        'GAZIRANI I NEGAZIRANI SOKOVI',
        'ZESTINE',
        'VINA',
        'SEJKOVI'
    ]
    
    existing_groups = df['Grupa'].dropna().unique().tolist()
    ordered_groups = [g for g in category_order if g in existing_groups]
    for g in existing_groups:
        if g not in ordered_groups:
            ordered_groups.append(g)
            
    def sort_group_df(group_name, group_df):
        normalized = str(group_name).strip().upper()
        if normalized == 'TOPLI NAPICI':
            def get_sort_key(row):
                name = str(row['Naziv']).lower()
                cena = float(row['Cena']) if pd.notna(row['Cena']) else 0.0
                is_coffee = any(w in name for w in ['kafa', 'espresso', 'macchiato', 'cappuccino', 'nes', 'latte', 'moka', 'domaca', 'domaća'])
                is_hot_ch = any(w in name for w in ['čokolada', 'cokolada', 'chocolate'])
                if is_coffee:
                    prio = 1
                elif is_hot_ch:
                    prio = 3
                else:
                    prio = 2
                return (prio, cena, name)
            rows = group_df.to_dict('records')
            rows.sort(key=get_sort_key)
            return pd.DataFrame(rows)
        else:
            rows = group_df.to_dict('records')
            rows.sort(key=lambda r: (float(r['Cena']) if pd.notna(r['Cena']) else 0.0, str(r['Naziv']).lower()))
            return pd.DataFrame(rows)

    for group in ordered_groups:
        group_df = df[df['Grupa'] == group]
        if group_df.empty:
            continue
            
        group_df = sort_group_df(group, group_df)
            
        group_elements = []
        group_elements.append(Paragraph(f"• {group.upper()} •", category_style))
        group_elements.append(Spacer(1, 4))
        
        table_data = []
        for _, row in group_df.iterrows():
            naziv = str(row['Naziv']).strip()
            jm = str(row['JM']).strip() if pd.notna(row['JM']) else ""
            cena_val = row['Cena']
            cena_str = f"{int(cena_val):,} RSD".replace(',', '.') if pd.notna(cena_val) else ""
            
            p_naziv = Paragraph(naziv, item_name_style)
            p_jm = Paragraph(jm, item_jm_style)
            p_price = Paragraph(cena_str, item_price_style)
            
            table_data.append([p_naziv, p_jm, p_price])
            
        # Table width: total printable width is ~535pt (A4 595 - 60 margins)
        col_widths = [375, 60, 100]
        
        t = Table(table_data, colWidths=col_widths)
        t.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
            ('LINEBELOW', (0, 0), (-1, -1), 0.5, LINE_COLOR),
        ]))
        
        group_elements.append(t)
        group_elements.append(Spacer(1, 14))
        
        story.append(KeepTogether(group_elements))
        
    def draw_background(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(BG_COLOR)
        canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=1, stroke=0)
        
        # Footer
        canvas.setFont('Arial', 8)
        canvas.setFillColor(TEXT_MUTED)
        page_num = canvas.getPageNumber()
        canvas.drawCentredString(doc.pagesize[0] / 2.0, 15, f"Teatar Beer Bar 13  •  Stranica {page_num}")
        canvas.restoreState()
        
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)
    print(f"PDF successfully generated at {pdf_path}")

if __name__ == '__main__':
    build_pdf()
