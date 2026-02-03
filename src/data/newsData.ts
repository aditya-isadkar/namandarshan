import padmanabhaswamy from "@/assets/news/padmanabhaswamy.png";
import goldenTemple from "@/assets/news/golden-temple.png";
import vaishnoDevi from "@/assets/news/vaishno-devi.png";

export interface NewsItem {
    id: string;
    slug: string;
    title: string;
    date: string;
    image: string;
    summary: string;
    content: string; // HTML or Markdown content
    templeSlug?: string; // Optional link to a specific temple
}

export const newsData: NewsItem[] = [
    {
        id: "1",
        slug: "padmanabhaswamy-treasure-limit",
        title: "Supreme Court Verdict on Padmanabhaswamy Temple Vault B",
        date: "February 14, 2024",
        image: padmanabhaswamy,
        summary: "The Supreme Court has deferred the decision on opening the mysterious Vault B of the Sree Padmanabhaswamy Temple.",
        content: `
            <p>The Sree Padmanabhaswamy Temple in Thiruvananthapuram, Kerala, is known as the richest temple in the world. Its secret vaults, known as "Kallaras," have been the subject of immense curiosity and legal battles.</p>
            <p>Recently, the Supreme Court of India has once again deferred the decision regarding the opening of **Vault B (Kallara B)**. Unlike the other vaults which were opened to reveal treasures worth billions, Vault B remains shut, shrouded in local legends of cobra protectors and curses.</p>
            <h3>Why is Vault B so mysterious?</h3>
            <p>According to local beliefs, opening Vault B could unleash a calamity. The vault is said to be guarded by snakes and can only be opened by a high-level saint chanting the 'Garuda Mantra'.</p>
            <p>The temple administration maintains that opening the vault is against the will of the deity and could disturb the spiritual sanctity of the shrine.</p>
        `,
        templeSlug: "padmanabhaswamy"
    },
    {
        id: "2",
        slug: "golden-temple-renovation",
        title: "Golden Temple: New Gold Plating Project Initiated",
        date: "March 01, 2024",
        image: goldenTemple,
        summary: "The SGPC has announced a comprehensive project to renovate the gold plating of the Harmandir Sahib.",
        content: `
            <p>The Shiromani Gurdwara Parbandhak Committee (SGPC) has announced a major renovation project for the **Golden Temple (Harmandir Sahib)** in Amritsar.</p>
            <p>Due to environmental factors and pollution, the luster of the gold plating on the main shrine has been affected over the years. The new project aims to clean, repair, and replace parts of the gold plating to restore its pristine glory.</p>
            <p>Volunteers (Kar Sevaks) from across the world are expected to participate in this holy service, demonstrating the spirit of selfless service that Sikhism embodies.</p>
        `,
        templeSlug: "golden-temple"
    },
    {
        id: "3",
        slug: "vaishno-devi-ropeway",
        title: "New Ropeway for Vaishno Devi Pilgrims",
        date: "March 10, 2024",
        image: vaishnoDevi,
        summary: "A new passenger ropeway from Trikuta Hills to the Bhawan is set to reduce travel time significantly.",
        content: `
            <p>Good news for pilgrims visiting the holy shrine of **Mata Vaishno Devi**. The Shrine Board has approved a new passenger ropeway project that will connect Trikuta Hills directly to the Bhawan.</p>
            <p>Currently, the 12-km trek can take several hours. The new ropeway is expected to cut this travel time down to just a few minutes, making the darshan accessible to the elderly and those with physical limitations.</p>
            <p>The project is expected to be completed by late 2025 and will feature state-of-the-art safety measures.</p>
        `,
        templeSlug: "vaishno-devi"
    }
];
