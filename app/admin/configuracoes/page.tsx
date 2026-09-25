"use client";

import { ChangeEvent, FormEvent } from "react";
import { Download, RotateCcw, Save, Settings, Upload } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";
import { exportChurchData, importChurchData, resetChurchData } from "@/lib/local-data";

export default function SettingsPage(){
  const {data,update}=useChurchData();
  if(!data)return <div className="dashboard">Carregando...</div>;

  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const fd=new FormData(e.currentTarget);
    update(c=>({...c,settings:{...c.settings,churchName:String(fd.get("churchName")||""),adminName:String(fd.get("adminName")||""),whatsapp:String(fd.get("whatsapp")||""),radioUrl:String(fd.get("radioUrl")||""),address:String(fd.get("address")||""),memberWelcome:String(fd.get("memberWelcome")||"")}}));
    alert("Configurações salvas neste navegador.");
  }

  async function restore(e:ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];
    if(!file)return;
    try{
      if(!confirm("Substituir os dados locais pelo conteúdo deste backup?"))return;
      await importChurchData(file);
      alert("Backup restaurado com sucesso.");
      location.reload();
    }catch{
      alert("Não foi possível restaurar este arquivo. Verifique se é um backup válido.");
    }finally{
      e.target.value="";
    }
  }

  return <>
    <header className="app-top"><div><b>Configurações</b><small> Personalize sua comunidade</small></div></header>
    <div className="dashboard settings-layout"><section><div className="page-title"><div><h1>Identidade e canais</h1><p>Essas informações também alimentam a área do membro.</p></div></div>
      <form className="settings-card product-form" onSubmit={submit}><div className="settings-icon"><Settings/></div><label>Nome da igreja<input name="churchName" defaultValue={data.settings.churchName}/></label><label>Nome do administrador<input name="adminName" defaultValue={data.settings.adminName}/></label><div className="form-grid"><label>WhatsApp oficial<input name="whatsapp" defaultValue={data.settings.whatsapp}/></label><label>Link da rádio/stream<input name="radioUrl" defaultValue={data.settings.radioUrl}/></label></div><label>Localização<input name="address" defaultValue={data.settings.address}/></label><label>Mensagem de boas-vindas<textarea name="memberWelcome" rows={3} defaultValue={data.settings.memberWelcome}/></label><button className="btn btn-primary"><Save size={16}/> Salvar configurações</button></form></section>
      <aside className="backup-card"><h3>Dados locais</h3><p>Sem banco de dados, tudo fica neste navegador. Faça um backup antes de limpar dados, trocar de computador ou navegador.</p><button className="btn btn-light" onClick={()=>exportChurchData(data)}><Download size={16}/> Baixar backup JSON</button><label className="backup-upload"><Upload size={15}/> Restaurar backup<input className="file-input" type="file" accept="application/json,.json" onChange={restore}/></label><button className="danger-outline" onClick={()=>{if(confirm("Restaurar os dados de demonstração? Seus dados locais serão substituídos.")){resetChurchData();location.reload()}}}><RotateCcw size={15}/> Restaurar demonstração</button></aside>
    </div>
  </>;
}
