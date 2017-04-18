# VirtualBox

<script type="text/javascript" src="../js/general.js"></script>

### 常用 Command
---

* Networking

```bash
# 設定 NAT Port forwarding
# modifyvm : 用於關閉的 VM
# controlvm : 用於啟動的 VM
# Cmd : 
# |- format : Policy-Name,type,Host-IP,Host-Port,Guest-IP,Guest-Port
# |- 如 guestssh,tcp,,2222,,22
VBoxManage modifyvm "VM name" --natpf1 "<Cmd>"
VBoxManage controlvm "VM name" natpf1 "<Cmd>"
```