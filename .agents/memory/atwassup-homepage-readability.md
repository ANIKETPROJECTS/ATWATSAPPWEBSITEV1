---
name: AtWassup homepage styling
description: User expectations for charcoal dark sections, sequential card motion, and readable homepage sections.
---

Use Poppins across the website for a creative but professional feel, and keep heading letter spacing moderate for readability. Make the desktop hero fill the 1024×576 first view, with the entire phone visible and clear of the navigation; do not shrink the whole hero to make it fit or add a separate interactive-preview row beneath it. Keep the phone preview prominent and larger on mobile while staying within the viewport width. Use visibly charcoal rather than near-black backgrounds for the Flow Builder and foundations sections. Replace static green corner dots on the foundations cards with a subtle sequential cursor pass. On mobile, keep horizontal clipping on the document root (`overflow-x: clip`) rather than `body`, place the brand block before footer links, and keep the Contact and map sections full-width. Center the three copyright, India, and Airavata-credit items as a mobile footer stack, clear of the floating WhatsApp button. Center each Flow Builder benefit heading and explanation within its column. Keep the Chatbot supporting text clearly readable against the mint background, and give that section comfortable vertical spacing.

**Why:** The user clarified that dark should not look black, requested sequential cursor motion on the foundations cards, asked for Poppins as the site-wide font, and repeatedly emphasized that the hero must fill one view without becoming too small or carrying an extra preview row. The user also asked for the mobile phone preview to be larger. The user later corrected the mobile footer order because the brand logo at the bottom looked misaligned; the brand block should now appear first on mobile. They then asked for the bottom three footer items to align as well. Root-level horizontal clipping keeps vertical scrolling natural.

**How to apply:** Keep Poppins as the body and display font, use moderate heading spacing, and use a visible charcoal tone for the named dark sections. At 1024×576, make the hero fill the first view while tuning its padding and phone scale so the full phone, heading, and CTAs fit without clipping under the nav or making the phone too small. On mobile, scale up the phone preview while respecting viewport width. For the footer on phones, put the brand block first, Explore and Legal side by side beneath it, and Contact and the map full-width below them; center the three bottom items in the width left clear of the floating WhatsApp button. Preserve the desktop order and spacing. Retain centered benefit groups, keep Chatbot support text dark on mint, preserve comfortable spacing, and verify mobile touch scrolling reaches the footer.

When a phone mockup needs contrast on charcoal, keep the device frame dark and add a light outline around it. The mockup library reuses `frameColor` on the Dynamic Island and home indicator, so changing the frame to silver makes those details look washed out.

**Why:** The user reported that the silver Flow Builder phone looked strange; the library applies that color to more than the outer bezel.

**How to apply:** Use the existing dark frame for authentic device details, and style an outer outline independently when a pale edge is needed.

The chatbot section should demonstrate an automatic customer/business chatbot WhatsApp conversation with exactly the hero's WhatsApp chrome and phone UI, rather than explain theoretical stages. Use a different business scenario from the hero's saree shop, with consistent branding/avatar and the business name above replies. Do not show Demo, Sample conversation, Auto-reply labels, or pause/play/replay controls. The left side should show the sender's number and conversation attributes being saved in an open creative visual, not a boxed contact card or table. Clearly explain that AtWassup's AI chatbot answers customer enquiries, asks for details and saves them for follow-up and marketing. Avoid booking slips, quote panels, numbered feature cards and dense theoretical explanations.

**Why:** The user explicitly asked to replace “How Our Chatbot Works” with an automatic inquiry-and-answer scenario, then clarified that merely using the same device library was not enough: the WhatsApp interface must match the hero exactly, without demo labels or playback buttons. They rejected the saree and booking-focused approaches, then approved synchronized contact/attribute capture. They still wanted a creative open visual instead of a card and explicit AI customer-management context that website visitors understand.

**How to apply:** Reuse the hero's actual UI artwork and styling rather than approximating it. Keep automatic playback and concise practical use cases, not theory diagrams. The animation is illustrative marketing content, not a live connection or evidence of actual customer conversations; keep that distinction in accessible descriptions without adding visible badges the user removed.

Keep the captured-detail labels and values clearly aligned and readable. Avoid decorative branching nodes and repeated contact metadata when they make this block look uneven.

**Why:** After approving automatic data capture, the user specifically rejected the captured-details presentation as not looking good and not properly aligned.

**How to apply:** Style the saved customer record like the Flow Builder's “Received in AtWassup” receipt: a small uppercase heading, a right-aligned capture count, and a balanced two-column grid of aligned label/value cells. Include audience tags as a grid entry so the last row remains balanced; do not add an icon before the heading.

The chatbot and Flow Builder section headings and phone mockups should share the same responsive scale, with both phones slightly enlarged while still fitting shorter viewports.

**Why:** The user explicitly asked for matching headline typography and equal, slightly larger phones across both sections.

**How to apply:** Keep the heading font size, weight, line height, and tracking consistent, and use the same responsive phone-width calculation for both demos.

Animated updates in the Chatbot and Flow sections should not make the page or content jump vertically.

**Why:** The user reported slight up/down movement whenever animated content appears and asked for it to stop.

**How to apply:** Reserve enough space for changing records, prevent browser scroll anchoring in both sections, and use fade-only entrance effects for changing content rather than vertical movement.
